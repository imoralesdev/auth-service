import { Request, Response } from 'express';

export const testApi = async (req: Request, res: Response) => {
    res.status(200).send('Status: OK')
}
