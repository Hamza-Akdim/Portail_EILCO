import React from "react";
import { Box, Typography, IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const NewsDetails = ({ open, news, onClose }) => {
    if (!news) return null;

    // Calcul de l'URL de l'image
    const imageSrc = news.imageData
        ? `data:${news.imageType};base64,${news.imageData}`
        : "fallback-image-url";

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "90%",
                    maxWidth: "600px",
                    bgcolor: "white",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                    borderRadius: "3px",
                    overflow: "hidden",
                    animation: "fadeIn 0.5s ease-in-out",
                }}
            >
                <style>
                    {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translate(-50%, -40%); }
              to { opacity: 1; transform: translate(-50%, -50%); }
            }
          `}
                </style>
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        height: "30vh",
                        background: `url(${imageSrc}) no-repeat center center`,
                        backgroundSize: "cover",
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            background: "rgba(0, 0, 0, 0.5)",
                        }}
                    />
                    <IconButton
                        onClick={onClose}
                        sx={{
                            position: "absolute",
                            top: "15px",
                            right: "15px",
                            color: "#fff",
                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                            "&:hover": {
                                backgroundColor: "rgba(255, 255, 255, 0.3)",
                            },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography
                        variant="h4"
                        sx={{
                            position: "absolute",
                            bottom: "15px",
                            left: "20px",
                            right: "10px",
                            color: "#fff",
                            fontWeight: "bold",
                            textShadow: "0 4px 6px rgba(0, 0, 0, 0.6)",
                            fontSize: { xs: "1.5rem", sm: "2rem" },
                        }}
                    >
                        {news.title}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        padding: "20px",
                        maxHeight: "300px",
                        overflowY: "auto",
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: "gray",
                            fontStyle: "italic",
                            marginBottom: "10px",
                            fontSize: { xs: "0.9rem", sm: "1rem" },
                        }}
                    >
                        {news.category}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            lineHeight: 1.8,
                            fontSize: { xs: "0.9rem", sm: "1rem" },
                        }}
                    >
                        {news.fullContent}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "10px",
                        background: "#f5f5f5",
                    }}
                >
                    <button
                        onClick={onClose}
                        style={{
                            padding: "10px 20px",
                            borderRadius: "30px",
                            border: "none",
                            backgroundColor: "#609ea5",
                            color: "#fff",
                            fontWeight: "bold",
                            cursor: "pointer",
                            transition: "background-color 0.3s",
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "lightblue")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#609ea5")}
                    >
                        Fermer
                    </button>
                </Box>
            </Box>
        </Modal>
    );
};

export default NewsDetails;
