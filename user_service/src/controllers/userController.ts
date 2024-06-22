import { Request, Response } from 'express';
import { createUser, updateUser, getUsers } from '../providers/userProvider';
import { sendEvent } from '../providers/sendEvent';
import { validationResult } from 'express-validator';

// Контроллер для создания пользователя
export const createUserController = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  const { name, email } = req.body;
  try {
    const user = await createUser(name, email);

    // Отправка события о создании пользователя
    await sendEvent({
      action: 'create',
      userId: user.id,
      timestamp: new Date().toISOString()
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'An error occurred while creating the user.' });
  }
};

// Контроллер для обновления пользователя
export const updateUserController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const user = await updateUser(parseInt(id, 10), name, email);
    if (user) {
      // Отправка события об изменении пользователя
      await sendEvent({
        action: 'update',
        userId: user.id,
        timestamp: new Date().toISOString()
      });

      res.status(200).json(user);
    } else {
      res.status(404).json({ error: `User with ID ${id} not found.` });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'An error occurred while updating the user.' });
  }
};

// Контроллер для получения списка пользователей
export const getUsersController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users.' });
  }
};
