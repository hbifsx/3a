const { User, Flight, Favorite } = require('../models/models');

/**
 * @swagger
 * /api/user/{userId}/favorites:
 *   get:
 *     summary: Get all favorite flights of a user
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: List of favorite flights
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 flights:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       airportArrival:
 *                         type: string
 *                       airportDeparture:
 *                         type: string
 *                       aviacompany:
 *                         type: string
 *                       favorite:
 *                         type: object
 *                         properties:
 *                           country:
 *                             type: string
 *       404:
 *         description: User not found
 *       400:
 *         description: Bad request
 */
exports.getUserFavorites = async (req, res) => {
    const { userId } = req.params;
    try {
        const userFavorites = await User.findByPk(userId, {
            include: {
                model: Flight,
                through: {
                    model: Favorite,
                    attributes: ['country']
                }
            }
        });
        if (!userFavorites) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(userFavorites);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * @swagger
 * /api/flight/{flightId}/favorites:
 *   get:
 *     summary: Get all users who have a specific flight as favorite
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: flightId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the flight
 *     responses:
 *       200:
 *         description: List of users with the flight as favorite
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 airportArrival:
 *                   type: string
 *                 airportDeparture:
 *                   type: string
 *                 aviacompany:
 *                   type: string
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       email:
 *                         type: string
 *                       favorite:
 *                         type: object
 *                         properties:
 *                           country:
 *                             type: string
 *       404:
 *         description: Flight not found
 *       400:
 *         description: Bad request
 */
exports.getFlightFavorites = async (req, res) => {
    const { flightId } = req.params;
    try {
        const flightFavorites = await Flight.findByPk(flightId, {
            include: {
                model: User,
                through: {
                    model: Favorite,
                    attributes: ['country']
                }
            }
        });
        if (!flightFavorites) {
            return res.status(404).json({ error: 'Flight not found' });
        }
        res.json(flightFavorites);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
