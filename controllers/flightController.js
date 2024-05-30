const { Flight } = require('../models/models');
/**
 * @swagger
 * tags:
 *   name: Flight
 *   description: API для управления полетами
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Flight:
 *       type: object
 *       tags: [Flight]
 *       required:
 *         - airportArrival
 *         - airportDeparture
 *         - aviacompany
 *       properties:
 *         id:
 *           type: integer
 *           description: Автоматически сгенерированный идентификатор рейса
 *         airportArrival:
 *           type: string
 *           description: Аэропорт прибытия рейса
 *         airportDeparture:
 *           type: string
 *           description: Аэропорт вылета рейса
 *         aviacompany:
 *           type: string
 *           description: Авиакомпания рейса
 *       example:
 *         airportArrival: "JFK"
 *         airportDeparture: "LAX"
 *         aviacompany: "Delta"
 */

const FlightController = {
  /**
   * @swagger
   * /api/flight:
   *   get:
   *     summary: Получить список всех рейсов
   *     tags: [Flight]
   *     responses:
   *       200:
   *         description: Список рейсов
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Flight'
   */
  getAllFlights: async (req, res) => {
    try {
      const flights = await Flight.findAll();
      res.json(flights);
    } catch (error) {
      console.error('Ошибка при получении рейсов:', error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  },

  /**
   * @swagger
   * /api/flight:
   *   post:
   *     summary: Создать новый рейс
   *     tags: [Flight]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Flight'
   *     responses:
   *       201:
   *         description: Рейс успешно создан
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Flight'
   */
  createFlight: async (req, res) => {
    const { airportArrival, airportDeparture, aviacompany } = req.body;

    // Check if required fields are present
    if (!airportArrival || !airportDeparture || !aviacompany) {
      return res.status(400).json({ error: 'Все поля (airportArrival, airportDeparture, aviacompany) обязательны для заполнения' });
    }

    try {
      const newFlight = await Flight.create({ airportArrival, airportDeparture, aviacompany });
      res.status(201).json(newFlight);
    } catch (error) {
      console.error('Ошибка при создании рейса:', error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  },

  /**
   * @swagger
   * /api/flight/{id}:
   *   get:
   *     summary: Получить рейс по идентификатору
   *     tags: [Flight]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: Идентификатор рейса для получения
   *     responses:
   *       200:
   *         description: Объект рейса
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Flight'
   *       404:
   *         description: Рейс не найден
   */
  getFlightById: async (req, res) => {
    try {
      const flight = await Flight.findByPk(req.params.id);
      if (flight) {
        res.json(flight);
      } else {
        res.status(404).json({ error: 'Рейс не найден' });
      }
    } catch (error) {
      console.error('Ошибка при получении рейса по идентификатору:', error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  },

  /**
   * @swagger
   * /api/flight/{id}:
   *   put:
   *     summary: Обновить рейс
   *     tags: [Flight]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: Идентификатор рейса для обновления
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Flight'
   *     responses:
   *       200:
   *         description: Обновленный объект рейса
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Flight'
   *       404:
   *         description: Рейс не найден
   */
  updateFlight: async (req, res) => {
    try {
      const flight = await Flight.findByPk(req.params.id);
      if (flight) {
        await flight.update(req.body);
        res.json(flight);
      } else {
        res.status(404).json({ error: 'Рейс не найден' });
      }
    } catch (error) {
      console.error('Ошибка при обновлении рейса:', error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  },

  /**
   * @swagger
   * /api/flight/{id}:
   *   delete:
   *     summary: Удалить рейс
   *     tags: [Flight]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: Идентификатор рейса для удаления
   *     responses:
   *       200:
   *         description: Успешно удалено
   *       404:
   *         description: Рейс не найден
   */
  deleteFlight: async (req, res) => {
    try {
      const flight = await Flight.findByPk(req.params.id);
      if (flight) {
        await flight.destroy();
        res.json({ message: 'Рейс успешно удален' });
      } else {
        res.status(404).json({ error: 'Рейс не найден' });
      }
    } catch (error) {
      console.error('Ошибка при удалении рейса:', error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  }
};

module.exports = FlightController;
