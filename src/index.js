import "./helpers/envConfig.helper.js";
import connectDB from "./db/connectDB.js";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("DB not connected", error);
        process.exit(1);
    });
