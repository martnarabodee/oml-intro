import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
    problem_id: String,
    difficulty: Number,
    dir: Number,
    content: [Number],
    comment: String,
    answer: Number,
    count: Number,
});

const Problem = mongoose.model('Problem', problemSchema);

mongoose.connect('key_to_db', { // Replace "key_to_db" with the real key
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export default Problem;
