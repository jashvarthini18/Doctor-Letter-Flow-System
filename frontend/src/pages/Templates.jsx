import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Templates() {
    const navigate = useNavigate();
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchTemplates = async () => {

            try {

                const response = await api.get("/templates");

                setTemplates(response.data.templates);

            } catch (error) {

                console.error(error);

                setError("Failed to load templates");

            } finally {

                setLoading(false);

            }
        };

        fetchTemplates();

    }, []);


    if (loading) {
        return <h2>Loading templates...</h2>;
    }


    if (error) {
        return <h2>{error}</h2>;
    }


    return (
        <div>

            <h1>Choose a Letter Template</h1>

            {templates.map((template) => (

                <div key={template.id}>

                    <h2>{template.name}</h2>

                    <p>{template.category}</p>

                    <button
    onClick={() => {
        navigate(`/editor?templateId=${template.id}`);
    }}
>
    Use Template
</button>

                </div>

            ))}

        </div>
    );
}

export default Templates;