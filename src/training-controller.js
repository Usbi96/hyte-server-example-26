import {
  getTrainingByUserId,
  getTrainingEntryById,
  createTrainingEntry,
  updateTrainingById,
  deleteTrainingById,
} from './training-model.js';

export const listTraining = async (req, res) => {
  try {
    const tokenUserId = Number(req.user.user_id);
    const training = await getTrainingByUserId(tokenUserId);
    res.json(training);
  } catch (error) {
    console.error('listTraining error:', error);
    res.status(500).json({
      message: 'Failed to get training entries',
      error: error.message,
    });
  }
};

export const getTraining = async (req, res) => {
  try {
    const training = await getTrainingEntryById(req.params.id);

    if (!training) {
      return res.status(404).json({message: 'Training entry not found'});
    }

    const tokenUserId = Number(req.user.user_id);
    const trainingUserId = Number(training.user_id);

    if (tokenUserId !== trainingUserId) {
      return res.status(403).json({message: 'forbidden'});
    }

    res.json(training);
  } catch (error) {
    console.error('getTraining error:', error);
    res.status(500).json({
      message: 'Failed to get training entry',
      error: error.message,
    });
  }
};

export const postTraining = async (req, res) => {
  try {
    const {training_date, training_type, duration_minutes, calories} = req.body;

    if (!training_date || !training_type) {
      return res.status(400).json({
        message: 'training_date and training_type are required',
      });
    }

    const newTraining = {
      user_id: Number(req.user.user_id),
      training_date,
      training_type,
      duration_minutes: duration_minutes ? Number(duration_minutes) : null,
      calories: calories ? Number(calories) : null,
    };

    const result = await createTrainingEntry(newTraining);

    res.status(201).json({
      message: 'Training entry created',
      training_id: result.insertId,
    });
  } catch (error) {
    console.error('postTraining error:', error);
    res.status(500).json({
      message: 'Failed to create training entry',
      error: error.message,
    });
  }
};

export const updateTraining = async (req, res) => {
  try {
    const training = await getTrainingEntryById(req.params.id);

    if (!training) {
      return res.status(404).json({message: 'Training entry not found'});
    }

    const tokenUserId = Number(req.user.user_id);
    const trainingUserId = Number(training.user_id);

    if (tokenUserId !== trainingUserId) {
      return res.status(403).json({message: 'forbidden'});
    }

    const result = await updateTrainingById(req.params.id, req.body);

    if (result.affectedRows === 0) {
      return res.status(404).json({message: 'Training entry not found'});
    }

    res.json({message: 'Training entry updated'});
  } catch (error) {
    console.error('updateTraining error:', error);
    res.status(500).json({
      message: 'Failed to update training entry',
      error: error.message,
    });
  }
};

export const deleteTraining = async (req, res) => {
  try {
    const training = await getTrainingEntryById(req.params.id);

    if (!training) {
      return res.status(404).json({message: 'Training entry not found'});
    }

    const tokenUserId = Number(req.user.user_id);
    const trainingUserId = Number(training.user_id);

    if (tokenUserId !== trainingUserId) {
      return res.status(403).json({message: 'forbidden'});
    }

    const result = await deleteTrainingById(req.params.id);

    if (result.affectedRows === 0) {
      return res.status(404).json({message: 'Training entry not found'});
    }

    res.sendStatus(204);
  } catch (error) {
    console.error('deleteTraining error:', error);
    res.status(500).json({
      message: 'Failed to delete training entry',
      error: error.message,
    });
  }
};
