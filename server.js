import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import dotenv from 'dotenv';

// Import Routes
import movieRoutes from './routes/movie.js';

// Import createLog
import createLog from './middleware/createLog.js';

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 5003;

// Construct the path to the current directory
const __dirname = dirname(fileURLToPath(import.meta.url));
const PATH = path.join(__dirname);

// Initialize express
const app = express();

// Parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use middleware
app.use(createLog);

// Use routes
app.use('/movie', movieRoutes);

// Handle 404 Page Not Found
app.use('*', (req, res) => {
    res.status(404).send('404: Page not found');
});

// Handle error 500 Something broke
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server is down!');
});

// Routes

// Listen server
app.listen(PORT, () => {
    console.log(`Server is running on port: https://localhost: ${PORT}`);
});
