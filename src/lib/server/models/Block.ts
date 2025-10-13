import mongoose, { Schema, Document } from 'mongoose';

// Base interface for the raw data (POJO)
export interface IBlockData {
	number: number;
	hash: string;
	parentHash: string;
	timestamp: number;
	gasLimit: number;
	gasUsed: number;
	transactions: string[];
}

// Interface for Mongoose Document (extends Document)
export interface IBlock extends IBlockData, Document {}

const BlockSchema: Schema = new Schema({
	number: { type: Number, required: true, unique: true },
	hash: { type: String, required: true },
	parentHash: { type: String, required: true },
	timestamp: { type: Number, required: true },
	gasLimit: { type: Number, required: true },
	gasUsed: { type: Number, required: true },
	transactions: [{ type: String, required: true }]
});

export const BlockModel = mongoose.models.Block || mongoose.model<IBlock>('Block', BlockSchema);
export default BlockModel;
