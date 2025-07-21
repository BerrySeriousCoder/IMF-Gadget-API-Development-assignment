import { Request, Response } from 'express';
import { db } from '../models/db';
import { gadgets } from '../models/gadget';
import { generateSuccessProbability } from '../utils/probability';
import { generateCodename } from '../utils/codename';
import { eq } from 'drizzle-orm';

export const getGadgets = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    let result;
    if (status && typeof status === 'string') {
      result = await db.select().from(gadgets).where(eq(gadgets.status, status));
    } else {
      result = await db.select().from(gadgets);
    }
    const gadgetsWithProbability = result.map(gadget => ({
      ...gadget,
      missionSuccessProbability: `${generateSuccessProbability()}% success probability`,
    }));
    res.json(gadgetsWithProbability);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch gadgets' });
  }
};

export const addGadget = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    const codename = generateCodename();
    const [newGadget] = await db.insert(gadgets).values({
      name: codename + ' - ' + name,
      status: 'Available',
    }).returning();
    res.status(201).json(newGadget);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add gadget' });
  }
};

export const updateGadget = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;
    if (!name && !status) {
      return res.status(400).json({ error: 'Nothing to update' });
    }
    const updateData: any = {};
    if (name) updateData.name = name;
    if (status) updateData.status = status;
    const [updatedGadget] = await db.update(gadgets)
      .set(updateData)
      .where(eq(gadgets.id, id))
      .returning();
    if (!updatedGadget) {
      return res.status(404).json({ error: 'Gadget not found' });
    }
    res.json(updatedGadget);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update gadget' });
  }
};

export const decommissionGadget = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [updatedGadget] = await db.update(gadgets)
      .set({ status: 'Decommissioned', decommissionedAt: new Date() })
      .where(eq(gadgets.id, id))
      .returning();
    if (!updatedGadget) {
      return res.status(404).json({ error: 'Gadget not found' });
    }
    res.json(updatedGadget);
  } catch (error) {
    res.status(500).json({ error: 'Failed to decommission gadget' });
  }
};

function generateConfirmationCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export const selfDestructGadget = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Optionally, you could update status to 'Destroyed' here if required
    const confirmationCode = generateConfirmationCode();
    res.json({
      message: `Self-destruct sequence initiated for gadget ${id}.`,
      confirmationCode,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to initiate self-destruct sequence' });
  }
}; 