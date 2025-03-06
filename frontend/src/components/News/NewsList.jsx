import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import NewsCard from "./NewsCard";

const NewsList = ({ newsList }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Vérifie si la liste est vide ou inexistante
    if (!newsList || newsList.length === 0) {
        return (
            <Box sx={{ padding: "8px 5px", textAlign: "center" }}>
                <Typography variant="h6">Aucune actualité disponible</Typography>
            </Box>
        );
    }

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % newsList.length);
    };

    const handlePrevious = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + newsList.length) % newsList.length
        );
    };

    return (
        <Box sx={{ padding: "8px 5px" }}>
            <Typography
                variant="h4"
                sx={{
                    textAlign: "center",
                    marginBottom: 3,
                    fontWeight: "bold",
                    color: "#333",
                    fontSize: {
                        xs: "1.5rem",
                        sm: "2rem",
                        md: "2.5rem",
                    },
                }}
            >
                Actualités de l école
            </Typography>
            <NewsCard
                news={newsList[currentIndex]}
                onNext={handleNext}
                onPrevious={handlePrevious}
            />
        </Box>
    );
};

export default NewsList;
