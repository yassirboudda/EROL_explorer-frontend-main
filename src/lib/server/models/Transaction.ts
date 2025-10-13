import mongoose, { Schema, Document } from 'mongoose';

// Base interface for the raw data (POJO)
export interface ITransactionData {
	hash: string;
	blockNumber: number;
	from: string;
	to: string;
	value: number;
	gasUsed: number;
	gasPrice: number;
	nonce: number;
	input: string;
	data: any;
	status: number;
}

// Interface for Mongoose Document (extends Document)
export interface ITransaction extends ITransactionData, Document {}

const TransactionSchema: Schema = new Schema({
	hash: { type: String, required: true, unique: true },
	blockNumber: { type: Number, required: true },
	from: { type: String, required: true },
	to: { type: String },
	value: { type: String, required: true },
	gasUsed: { type: Number, required: true },
	gasPrice: { type: Number, required: true },
	nonce: { type: Number, required: true },
	input: { type: String, required: true },
	data: { type: Object, required: false },
	status: { type: Number, required: true }
});

export const TransactionModel =
	mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);
export default TransactionModel;
