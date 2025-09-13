import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ControlProjects = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        liveLink: "",
        githubLink: "",
        challenges: "",
        futureImprovements: "",
        technologies: "",
    });

    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);

    const imgbbApiKey = "YOUR_IMGBB_API_KEY"; // replace with your API key

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle file selection
    const handleFileChange = (e) => {
        setImages([...e.target.files]);
    };

    // Upload images to ImgBB
    const uploadImages = async () => {
        setUploading(true);
        const uploadedUrls = [];
        for (let file of images) {
            const form = new FormData();
            form.append("image", file);

            try {
                const res = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
                    form
                );
                uploadedUrls.push(res.data.data.url);
            } catch (err) {
                console.error("Image upload failed:", err);
                Swal.fire("Error", "Image upload failed", "error");
            }
        }
        setUploading(false);
        return uploadedUrls;
    };

    // Submit project
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Upload images first
        const uploadedUrls = await uploadImages();

        // Prepare project object
        const newProject = {
            title: formData.title,
            description: formData.description,
            liveLink: formData.liveLink,
            githubLink: formData.githubLink,
            challenges: formData.challenges,
            futureImprovements: formData.futureImprovements,
            technologies: formData.technologies.split(",").map((t) => t.trim()), // convert to array
            images: uploadedUrls,
            image: uploadedUrls[0] || "", // first image as main thumbnail
        };

        try {
            await axios.post("http://localhost:5000/projects", newProject); // replace with your backend URL
            Swal.fire("Success", "Project added successfully!", "success");
            setFormData({
                title: "",
                description: "",
                liveLink: "",
                githubLink: "",
                challenges: "",
                futureImprovements: "",
                technologies: "",
            });
            setImages([]);
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to add project", "error");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-base-200 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Add New Project</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Project Title"
                    className="input input-bordered w-full"
                    required
                />

                {/* Description */}
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Project Description"
                    className="textarea textarea-bordered w-full"
                    required
                ></textarea>

                {/* Live Link */}
                <input
                    type="url"
                    name="liveLink"
                    value={formData.liveLink}
                    onChange={handleChange}
                    placeholder="Live Link"
                    className="input input-bordered w-full"
                />

                {/* GitHub Link */}
                <input
                    type="url"
                    name="githubLink"
                    value={formData.githubLink}
                    onChange={handleChange}
                    placeholder="GitHub Link"
                    className="input input-bordered w-full"
                />

                {/* Challenges */}
                <textarea
                    name="challenges"
                    value={formData.challenges}
                    onChange={handleChange}
                    placeholder="Challenges faced"
                    className="textarea textarea-bordered w-full"
                ></textarea>

                {/* Future Improvements */}
                <textarea
                    name="futureImprovements"
                    value={formData.futureImprovements}
                    onChange={handleChange}
                    placeholder="Future Improvements"
                    className="textarea textarea-bordered w-full"
                ></textarea>

                {/* Technologies */}
                <input
                    type="text"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleChange}
                    placeholder="Technologies (comma separated)"
                    className="input input-bordered w-full"
                />

                {/* File Upload */}
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="file-input file-input-bordered w-full"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                    {images.length > 0 &&
                        Array.from(images).map((img, i) => (
                            <p key={i} className="text-xs bg-base-300 p-1 rounded">
                                {img.name}
                            </p>
                        ))}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={uploading}
                >
                    {uploading ? "Uploading..." : "Add Project"}
                </button>
            </form>
        </div>
    );
};

export default ControlProjects;
