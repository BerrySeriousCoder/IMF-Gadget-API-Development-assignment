import { Router } from 'express';
import {
  getGadgets,
  addGadget,
  updateGadget,
  decommissionGadget,
  selfDestructGadget,
} from '../controllers/gadgetsController';

const router = Router();

/**
 * @swagger
 * /gadgets:
 *   get:
 *     summary: Get all gadgets
 *     description: Retrieve a list of all gadgets, each with a random mission success probability. Optionally filter by status.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter gadgets by status
 *     responses:
 *       200:
 *         description: List of gadgets
 *   post:
 *     summary: Add a new gadget
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Gadget created
 */
router.get('/', getGadgets);
router.post('/', addGadget);

/**
 * @swagger
 * /gadgets/{id}:
 *   patch:
 *     summary: Update a gadget
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Gadget updated
 *   delete:
 *     summary: Decommission a gadget
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gadget decommissioned
 */
router.patch('/:id', updateGadget);
router.delete('/:id', decommissionGadget);

/**
 * @swagger
 * /gadgets/{id}/self-destruct:
 *   post:
 *     summary: Trigger self-destruct sequence for a gadget
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Self-destruct sequence initiated
 */
router.post('/:id/self-destruct', selfDestructGadget);

export default router; 