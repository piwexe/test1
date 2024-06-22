import { Router } from 'express';
import { body, param } from 'express-validator';
import { createUserController, updateUserController, getUsersController } from '../controllers/userController';

const router = Router();

// Валидация и создание пользователя
router.post(
  '/users',
  [
    body('name')
      .isString().withMessage('Name must be a string')
      .notEmpty().withMessage('Name is required'),
    body('email')
      .isEmail().withMessage('Email must be a valid email address')
      .notEmpty().withMessage('Email is required'),
  ],
  createUserController
);

// Валидация и обновление пользователя
router.put(
  '/users/:id',
  [
    param('id')
      .isInt().withMessage('ID must be an integer')
      .notEmpty().withMessage('ID is required'),
    body('name')
      .isString().withMessage('Name must be a string')
      .notEmpty().withMessage('Name is required'),
    body('email')
      .isEmail().withMessage('Email must be a valid email address')
      .notEmpty().withMessage('Email is required'),
  ],
  updateUserController
);

// Получение списка пользователей
router.get('/users', getUsersController);

export default router;
