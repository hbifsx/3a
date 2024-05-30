// controllers/flightNumberController.js
const { FlightNumber } = require('../models/models');

/**
 * @swagger
 * tags:
 *   name: FlightNumber
 *   description: API для управления номерами рейсов
 */
const FlightNumberController = {
  /**
   * @swagger
   * components:
   *   schemas:
   *     FlightNumber:
   *       type: object
   *       required:
   *         - aviacompany
   *         - flightId
   *       properties:
   *         id:
   *           type: integer
   *           description: Автогенерированный ID
   *         aviacompany:
   *           type: string
   *           description: flight number
   *         flightId:
   *           type: integer
   *           description: Идентификатор соответствующего рейса
   *       example:
   *         id: 1
   *         aviacompany: "DL123"
   *         flightId: 1
   */

  /**
   * @swagger
   * /api/flightnumber:
   *   get:
   *     summary: Получить список всех номеров рейсов
   *     tags: [FlightNumber]
   *     responses:
   *       200:
   *         description: Список номеров рейсов
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/FlightNumber'
   */
  getAllFlightNumbers: async (req, res) => {
    try {
      const flightNumbers = await FlightNumber.findAll();
      res.json(flightNumbers);
    } catch (error) {
      console.error('Error fetching flight numbers:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  /**
   * @swagger
   * /api/flightnumber:
   *   post:
   *     summary: Создайте новый номер рейса
   *     tags: [FlightNumber]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/FlightNumber'
   *     responses:
   *       201:
   *         description: Успешно созданно
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/FlightNumber'
   */
  createFlightNumber: async (req, res) => {
    const { aviacompany, flightId } = req.body;

    // Check if required fields are present
    if (!aviacompany || !flightId) {
      return res.status(400).json({ error: 'Поля aviacompany и flightId обязательны для заполнения' });
    }

    try {
      const newFlightNumber = await FlightNumber.create({ aviacompany, flightId });
      res.status(201).json(newFlightNumber);
    } catch (error) {
      console.error('Ошибка при создании номера рейса:', error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  },

  /**
   * @swagger
   * /api/flightnumber/{id}:
   *   put:
   *     summary: Обновить номер рейса
   *     tags: [FlightNumber]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: Идентификационный номер рейса, который необходимо обновить
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/FlightNumber'
   *     responses:
   *       200:
   *         description: Обновленный объект с номером рейса
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/FlightNumber'
   *       404:
   *         description: Номер рейса не найден
   */
  updateFlightNumber: async (req, res) => {
    const { aviacompany, flightId } = req.body;

    
    if (!aviacompany || !flightId) {
      return res.status(400).json({ error: 'Поля aviacompany и flightId обязательны для заполнения' });
    }

    try {
      const flightNumber = await FlightNumber.findByPk(req.params.id);
      if (flightNumber) {
        await flightNumber.update({ aviacompany, flightId });
        res.json(flightNumber);
      } else {
        res.status(404).json({ error: 'Номер рейса не найден' });
      }
    } catch (error) {
      console.error('Ошибка при обновлении номера рейса:', error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  }
};

module.exports = FlightNumberController;
