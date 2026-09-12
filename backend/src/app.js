require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("../../netlify/functions/config/database");

const { generatePDF } = require("../../netlify/functions/services/pdfService");
// const { uploadPDF, getPDFDownloadUrl } = require("./services/s3Service");
const {
  uploadPDF,
  getPDFDownloadUrl,
  getSignedFileUrl,
  deletePDF
} = require("../../netlify/functions/services/s3Service");

const app = express();

app.use(cors());
app.use(express.json());

// Test database connection
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      message: "Database connected successfully",
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Database connection failed",
      error: error.message,
    });
  }
});

// Doctor access API
app.post("/api/doctors/access", async (req, res) => {
  try {
    const { mobile_number } = req.body;

    // Check whether mobile number was provided
    if (!mobile_number) {
      return res.status(400).json({
        message: "Mobile number is required",
      });
    }

    // Search doctor in database
    const result = await pool.query(
      `SELECT *
             FROM doctors
             WHERE mobile_number = $1`,
      [mobile_number],
    );

    // Doctor found
    if (result.rows.length > 0) {
      return res.json({
        message: "Doctor found",
        doctor: result.rows[0],
      });
    }

    // Doctor not found
    return res.status(404).json({
      message: "Doctor not found",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

app.get("/api/templates", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT *
             FROM templates
             ORDER BY id`,
    );

    res.json({
      templates: result.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch templates",
      error: error.message,
    });
  }
});

app.get("/api/templates/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT *
             FROM templates
             WHERE id = $1`,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Template not found",
      });
    }

    res.json({
      template: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch template",
      error: error.message,
    });
  }
});

// ========================================
// SAVE / UPDATE DRAFT
// ========================================

app.post("/api/drafts", async (req, res) => {
  try {
    const { doctor_id, template_id, content_html } = req.body;

    // Validate required fields
    if (!doctor_id || !template_id || !content_html) {
      return res.status(400).json({
        message: "doctor_id, template_id and content_html are required",
      });
    }

    // Check whether a draft already exists
    const existingDraft = await pool.query(
      `SELECT *
             FROM drafts
             WHERE doctor_id = $1
             AND template_id = $2`,
      [doctor_id, template_id],
    );

    // Update existing draft
    if (existingDraft.rows.length > 0) {
      const updatedDraft = await pool.query(
        `UPDATE drafts
                 SET content_html = $1,
                     updated_at = CURRENT_TIMESTAMP
                 WHERE id = $2
                 RETURNING *`,
        [content_html, existingDraft.rows[0].id],
      );

      return res.json({
        message: "Draft updated successfully",
        draft: updatedDraft.rows[0],
      });
    }

    // Create new draft
    const newDraft = await pool.query(
      `INSERT INTO drafts
             (doctor_id, template_id, content_html)
             VALUES ($1, $2, $3)
             RETURNING *`,
      [doctor_id, template_id, content_html],
    );

    return res.status(201).json({
      message: "Draft created successfully",
      draft: newDraft.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to save draft",
      error: error.message,
    });
  }
});

// ========================================
// GET DRAFT
// ========================================

app.get("/api/drafts", async (req, res) => {
  try {
    const { doctor_id, template_id } = req.query;

    if (!doctor_id || !template_id) {
      return res.status(400).json({
        message: "doctor_id and template_id are required",
      });
    }

    const result = await pool.query(
      `SELECT *
             FROM drafts
             WHERE doctor_id = $1
             AND template_id = $2`,
      [doctor_id, template_id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Draft not found",
      });
    }

    res.json({
      draft: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch draft",
      error: error.message,
    });
  }
});

app.post("/api/letters/generate", async (req, res) => {
  try {
    const { doctor_id, template_id, patient_name, letter_type, content_html } =
      req.body;

    console.log("BACKEND RECEIVED CONTENT:", content_html);

    if (!doctor_id || !content_html) {
      return res.status(400).json({
        message: "doctor_id and content_html are required",
      });
    }

    console.log("Generating PDF...");

    // Generate PDF
    const pdfBuffer = await generatePDF(content_html);

    console.log("PDF generated successfully");

    // Create unique S3 path
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");

    const uniqueId = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 8)}`;

    const safeLetterType = (letter_type || "Other").replace(
      /[^a-zA-Z0-9-_]/g,
      "_",
    );

    const s3Key =
      `doctors/${doctor_id}/` +
      `${safeLetterType}/` +
      `${year}/${month}/` +
      `letter-${uniqueId}.pdf`;

    console.log("Uploading to S3:", s3Key);

    // Upload PDF
    await uploadPDF(pdfBuffer, s3Key);

    console.log("PDF uploaded successfully");

    // Save metadata
    const result = await pool.query(
      `INSERT INTO letters
            (
                doctor_id,
                template_id,
                patient_name,
                letter_type,
                content_html,
                s3_key
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
      [
        doctor_id,
        template_id || null,
        patient_name || null,
        letter_type || null,
        content_html,
        s3Key,
      ],
    );

    const letter = result.rows[0];

    // Generate signed URL
    const downloadUrl = await getPDFDownloadUrl(s3Key);

    res.status(201).json({
      message: "Letter generated successfully",
      letter,
      download_url: downloadUrl,
    });
  } catch (error) {
    console.error("LETTER GENERATION ERROR:", error);

    res.status(500).json({
      message: "Failed to generate letter",
      error: error.message,
    });
  }
});

app.get("/api/letters", async (req, res) => {
  try {
    const { doctor_id } = req.query;

    if (!doctor_id) {
      return res.status(400).json({
        message: "doctor_id is required",
      });
    }

    const result = await pool.query(
      `SELECT
                id,
                doctor_id,
                template_id,
                patient_name,
                letter_type,
                content_html,
                s3_key,
                created_at,
                updated_at
             FROM letters
             WHERE doctor_id = $1
             ORDER BY created_at DESC`,
      [doctor_id],
    );

    res.json({
      letters: result.rows,
    });
  } catch (error) {
    console.error("HISTORY ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch letter history",
      error: error.message,
    });
  }
});

app.get("/api/letters/:id/download", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT s3_key
             FROM letters
             WHERE id = $1`,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Letter not found",
      });
    }

    const s3Key = result.rows[0].s3_key;

    const downloadUrl = await getPDFDownloadUrl(s3Key);

    res.json({
      download_url: downloadUrl,
    });
  } catch (error) {
    console.error("DOWNLOAD ERROR:", error);

    res.status(500).json({
      message: "Failed to generate download URL",
      error: error.message,
    });
  }
});

app.get("/api/letters/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT
                id,
                doctor_id,
                template_id,
                patient_name,
                letter_type,
                content_html,
                s3_key,
                created_at,
                updated_at
             FROM letters
             WHERE id = $1`,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Letter not found",
      });
    }

    res.json({
      letter: result.rows[0],
    });
  } catch (error) {
    console.error("GET LETTER ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch letter",
      error: error.message,
    });
  }
});

app.get("/api/doctors/:id/profile", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT
                id,
                mobile_number,
                name,
                clinic_name,
                clinic_address,
                logo_url,
                signature_url
             FROM doctors
             WHERE id = $1`,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    const doctor = result.rows[0];

    let logoSignedUrl = null;
    let signatureSignedUrl = null;

    if (doctor.logo_url) {
      logoSignedUrl = await getSignedFileUrl(doctor.logo_url);
    }

    if (doctor.signature_url) {
      signatureSignedUrl = await getSignedFileUrl(doctor.signature_url);
    }

    res.json({
      doctor: {
        ...doctor,
        logo_url: logoSignedUrl,
        signature_url: signatureSignedUrl,
      },
    });
  } catch (error) {
    console.error("DOCTOR PROFILE ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch doctor profile",
      error: error.message,
    });
  }
});

app.delete("/api/letters/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Get the letter first
        const result = await pool.query(
            `SELECT * FROM letters WHERE id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Letter not found"
            });
        }

        const letter = result.rows[0];

        // Delete PDF from S3
        if (letter.s3_key) {
            await deletePDF(letter.s3_key);
            console.log("PDF deleted from S3:", letter.s3_key);
        }

        // Delete letter from database
        await pool.query(
            `DELETE FROM letters WHERE id = $1`,
            [id]
        );

        res.json({
            message: "Letter and PDF deleted successfully"
        });

    } catch (error) {
        console.error("DELETE LETTER ERROR:", error);

        res.status(500).json({
            message: "Failed to delete letter",
            error: error.message
        });
    }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
