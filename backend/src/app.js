require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./config/database");

const { generatePDF } = require("./services/pdfService");

const app = express();

app.use(cors());
app.use(express.json());


// Test database connection
app.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            message: "Database connected successfully",
            time: result.rows[0].now
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Database connection failed",
            error: error.message
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
                message: "Mobile number is required"
            });
        }


        // Search doctor in database
        const result = await pool.query(
            `SELECT *
             FROM doctors
             WHERE mobile_number = $1`,
            [mobile_number]
        );


        // Doctor found
        if (result.rows.length > 0) {

            return res.json({
                message: "Doctor found",
                doctor: result.rows[0]
            });

        }


        // Doctor not found
        return res.status(404).json({
            message: "Doctor not found"
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

app.get("/api/templates", async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT *
             FROM templates
             ORDER BY id`
        );

        res.json({
            templates: result.rows
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch templates",
            error: error.message
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
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Template not found"
            });
        }

        res.json({
            template: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch template",
            error: error.message
        });
    }
});

// ========================================
// SAVE / UPDATE DRAFT
// ========================================

app.post("/api/drafts", async (req, res) => {

    try {

        const {
            doctor_id,
            template_id,
            content_html
        } = req.body;


        // Validate required fields
        if (!doctor_id || !template_id || !content_html) {

            return res.status(400).json({
                message: "doctor_id, template_id and content_html are required"
            });

        }


        // Check whether a draft already exists
        const existingDraft = await pool.query(
            `SELECT *
             FROM drafts
             WHERE doctor_id = $1
             AND template_id = $2`,
            [doctor_id, template_id]
        );


        // Update existing draft
        if (existingDraft.rows.length > 0) {

            const updatedDraft = await pool.query(
                `UPDATE drafts
                 SET content_html = $1,
                     updated_at = CURRENT_TIMESTAMP
                 WHERE id = $2
                 RETURNING *`,
                [
                    content_html,
                    existingDraft.rows[0].id
                ]
            );


            return res.json({
                message: "Draft updated successfully",
                draft: updatedDraft.rows[0]
            });

        }


        // Create new draft
        const newDraft = await pool.query(
            `INSERT INTO drafts
             (doctor_id, template_id, content_html)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [
                doctor_id,
                template_id,
                content_html
            ]
        );


        return res.status(201).json({
            message: "Draft created successfully",
            draft: newDraft.rows[0]
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to save draft",
            error: error.message
        });

    }

});

// ========================================
// GET DRAFT
// ========================================

app.get("/api/drafts", async (req, res) => {

    try {

        const {
            doctor_id,
            template_id
        } = req.query;


        if (!doctor_id || !template_id) {

            return res.status(400).json({
                message: "doctor_id and template_id are required"
            });

        }


        const result = await pool.query(
            `SELECT *
             FROM drafts
             WHERE doctor_id = $1
             AND template_id = $2`,
            [
                doctor_id,
                template_id
            ]
        );


        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Draft not found"
            });

        }


        res.json({
            draft: result.rows[0]
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch draft",
            error: error.message
        });

    }

});

app.post("/api/letters/generate", async (req, res) => {

    try {

        const {
            doctor_id,
            template_id,
            patient_name,
            letter_type,
            content_html
        } = req.body;


        if (!doctor_id || !content_html) {

            return res.status(400).json({
                message: "doctor_id and content_html are required"
            });

        }


        console.log("Generating PDF...");


        const pdfBuffer = await generatePDF(content_html);


        console.log("PDF generated successfully");


        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=letter.pdf",
            "Content-Length": pdfBuffer.length
        });


        res.send(pdfBuffer);


    } catch (error) {

        console.error("PDF ERROR:", error);

        res.status(500).json({
            message: "Failed to generate PDF",
            error: error.message
        });

    }

});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});