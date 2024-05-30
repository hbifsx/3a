const { Favorite } = require('../models/models');
const ApiError = require('../error/ApiError');

/**
 * @swagger
 * tags:
 *   name: Favorite
 *   description: API для работы с избранными рейсами
 */
/**
 * @swagger
* components:
*  schemas:
*    Favorite:
*      type: object
*      properties:
*        
*        country:
*          type: string
*          example: "1"
*        userId:
*          type: string
*          example: "2"
*        flightId:
*          type: string
*          example: "3"
*      required:
*        - country
*        - userId
*        - flightId
*/

// Контроллер для избранных рейсов
const FavoriteController = {
  /**
   * @swagger
   * /api/favorite:
   *   get:
   *     summary: Получить список всех избранных рейсов
   *     tags: [Favorite]
   *     responses:
   *       200:
   *         description: Список избранных рейсов
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Favorite'
   */
  getFavorites: async (req, res, next) => {
    try {
      const favorites = await Favorite.findAll();
      res.json(favorites);
    } catch (error) {
      next(ApiError.internal('Ошибка при получении списка избранных рейсов'));
    }
  },

  /**
   * @swagger
   * /api/favorite:
   *   post:
   *     summary: Добавить новый избранный рейс
   *     tags: [Favorite]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Favorite'
   *     responses:
   *       201:
   *         description: Избранный рейс успешно добавлен
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Favorite'
   */
  addFavorite: async (req, res, next) => {
    try {
      // Добавляем текущие даты для createdAt и updatedAt
      req.body.createdAt = new Date();
      req.body.updatedAt = new Date();

      const newFavorite = await Favorite.create(req.body);
      res.status(201).json(newFavorite);
    } catch (error) {
      console.error('Ошибка при добавлении избранного рейса:', error);
      next(ApiError.internal('Ошибка при добавлении избранного рейса'));
    }
  },

  /**
   * @swagger
   * /api/favorite/{id}:
   *   put:
   *     summary: Обновить информацию об избранном рейсе
   *     tags: [Favorite]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID избранного рейса для обновления
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Favorite'
   *     responses:
   *       200:
   *         description: Обновленный объект избранного рейса
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Favorite'
   *       404:
   *         description: Избранный рейс не найден
   */
  updateFavorite: async (req, res, next) => {
    try {
      const favorite = await Favorite.findByPk(req.params.id);
      if (!favorite) {
        return next(ApiError.notFound('Избранный рейс не найден'));
      }
      await favorite.update(req.body);
      res.json(favorite);
    } catch (error) {
      next(ApiError.internal('Ошибка при обновлении избранного рейса'));
    }
  }
};

module.exports = FavoriteController;
