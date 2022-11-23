import mongoose, { Model, Schema } from "mongoose";
import { PRIVATE_MONGO_ID, PRIVATE_MONGO_PASSWORD } from "$env/static/private";

const DB_KEY = "mongodb+srv://Jeremaster104:<password>@<id|cluster>.mongodb.net/?retryWrites=true&w=majority".replace('<password>', encodeURIComponent(PRIVATE_MONGO_PASSWORD)).replace('<id|cluster>', PRIVATE_MONGO_ID)

const User: [string, Schema] = ["user", new mongoose.Schema(
		{
			_id: {
				type: String
			},
			provider_id: {
				type: String,
				unique: true,
				required: true
			}, // should always be minecraft username 
			hashed_password: String,
            displayName: { type: String, unique: true, required: true }, // Doesn't have to be the same as minecraft username
			coins: { type: Number, default: 0 },
			verified: { type: Boolean, default: false },
			plots: [{ type: mongoose.Types.ObjectId, ref: "plot" }]
		},
		{ _id: false }
)]

const Ad: [string, Schema] = ["ad", new mongoose.Schema({
	owner: { type: String, ref: "user" },
	budget: { type: Number, required: true },
	totalSpent: { type: Number, default: 0 },
	plot: { type: mongoose.Types.ObjectId, ref: "plot" },
	message: { type: String, required: true }
}).pre('save', function(next) {
	if(this.totalSpent >= this.budget) this.delete();
	next();
})]

const Session: [string, Schema] = ["session", new mongoose.Schema(
		{
			_id: {
				type: String
			},
			user_id: {
				type: String,
				required: true
			},
			expires: {
				type: Number,
				required: true
			},
			idle_expires: {
				type: Number,
				required: true
			}
		},
		{ _id: false }
	)
]

const Plot: [string, Schema] = ["plot", new mongoose.Schema(
    {
        plot_id: { type: Number, required: true, unique: true },
        name: { type: String, required: true },
        owner: { type: String, ref: "user" },
        dev: [{ type: String, ref: "user" }],
        buidlers: [{ type: String, ref: "user" }]
    }
)]

function mold(...schemas: [string, Schema][]): { [key: string]: Model<any> } {
    const db: { [key: string]: Model<any> } = {}
    schemas.forEach((v) => {
        db[v[0]] = mongoose.models[v[0]] || mongoose.model(v[0], v[1])
    })
    return db
}

const db = mold(User, Session, Plot, Ad)
mongoose.connect(DB_KEY, {
	dbName: "prod"
})

export default mongoose;
export { db }