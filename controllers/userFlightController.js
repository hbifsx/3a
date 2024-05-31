const { User, Flight, Favorite } = require('../models/models');

/**
 * @swagger
 * /api/userflight/user/{userId}/favorite:
 *   get:
 *     summary: Получить все избранные рейсы пользователя
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Список избранных рейсов
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
        console.log(`Получение избранных рейсов для пользователя: ${userId}`);
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
            console.log(`Пользователь с ID ${userId} не найден`);
            return res.status(404).json({ error: 'Пользователь не найден' });
        }
        res.json(userFavorites);
    } catch (error) {
        console.error(`Ошибка при получении избранных рейсов пользователя: ${error.message}`);
        res.status(400).json({ error: error.message });
    }
};

/**
 * @swagger
 * /api/userflight/flight/{flightId}/favorite:
 *   get:
 *     summary: Получить всех пользователей, у которых определенный рейс в избранных
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: flightId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID рейса
 *     responses:
 *       200:
 *         description: Список пользователей с этим рейсом в избранных
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
 *         description: Рейс не найден
 *       400:
 *         description: Плохой запрос
 */
exports.getFlightFavorites = async (req, res) => {
    const { flightId } = req.params;
    try {
        console.log(`Получение пользователей для рейса: ${flightId}`);
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
            console.log(`Рейс с ID ${flightId} не найден`);
            return res.status(404).json({ error: 'Рейс не найден' });
        }
        res.json(flightFavorites);
    } catch (error) {
        console.error(`Ошибка при получении пользователей рейса: ${error.message}`);
        res.status(400).json({ error: error.message });
    }
};
