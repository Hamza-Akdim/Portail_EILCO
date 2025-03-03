import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import NewsDetails from "./NewsDetails";

const NewsCard = ({ news, onNext, onPrevious }) => {
    const [showDetails, setShowDetails] = useState(false);

    if (!news) return null;

    const handleDetailsOpen = () => setShowDetails(true);
    const handleDetailsClose = () => setShowDetails(false);

    // Génère l'URL de l'image à partir de l'image stockée dans la BDD
    const imageSrc = news.imageData
        ? `data:${news.imageType};base64,${news.imageData}`
        : "fallback-image-url";

    return (
        <>
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "750px",
                    height: "400px",
                    margin: "20px auto",
                    borderRadius: "7px",
                    overflow: "hidden",
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(${imageSrc})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "#fff",
                    animation: "fadeIn 0.8s ease-in-out",
                }}
            >
                <style>
                    {`
            @keyframes fadeIn {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
            }
          `}
                </style>
                <Box
                    sx={{
                        zIndex: 2,
                        textAlign: "left",
                        padding: "20px",
                        maxWidth: "600px",
                        backdropFilter: "blur(1px)",
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                        borderRadius: "4px",
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 700,
                            textTransform: "uppercase",
                            marginBottom: 2,
                            textShadow: "0 4px 6px rgba(0, 0, 0, 0.6)",
                            fontSize: "clamp(1.5rem, 2.5vw, 2.5rem)",
                        }}
                    >
                        {news.title}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                            fontStyle: "italic",
                            color: "rgba(255, 255, 255, 0.8)",
                            marginBottom: 3,
                        }}
                    >
                        {news.category}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            lineHeight: 1.6,
                            fontSize: "clamp(0.9rem, 1.2vw, 1rem)",
                            color: "rgba(255, 255, 255, 0.9)",
                            marginBottom: 4,
                        }}
                    >
                        {news.content}
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "rgba(96, 158, 165, 0.69)",
                            color: "#fff",
                            padding: "10px 20px",
                            fontWeight: 600,
                            borderRadius: "30px",
                            fontSize: "1rem",
                            "&:hover": {
                                backgroundColor: "lightblue",
                            },
                        }}
                        onClick={handleDetailsOpen}
                    >
                        Lire la suite
                    </Button>
                </Box>
                <Button
                    onClick={onPrevious}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: { xs: "5px", sm: "15px" },
                        transform: "translateY(-50%)",
                        color: "#fff",
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        borderRadius: "50%",
                        minWidth: { xs: "40px", sm: "50px" },
                        minHeight: { xs: "40px", sm: "50px" },
                        "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.3)",
                        },
                        zIndex: 3,
                    }}
                >
                    <ArrowBackIosNewIcon fontSize="small" />
                </Button>
                <Button
                    onClick={onNext}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        right: { xs: "5px", sm: "15px" },
                        transform: "translateY(-50%)",
                        color: "#fff",
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        borderRadius: "50%",
                        minWidth: { xs: "40px", sm: "50px" },
                        minHeight: { xs: "40px", sm: "50px" },
                        "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.3)",
                        },
                        zIndex: 3,
                    }}
                >
                    <ArrowForwardIosIcon fontSize="small" />
                </Button>
            </Box>
            <NewsDetails open={showDetails} news={news} onClose={handleDetailsClose} />
        </>
    );
};

export default NewsCard;
