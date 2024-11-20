const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../server');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const { expect } = chai;
chai.use(chaiHttp);

describe('User Routes', () => {
    let userStub;

    beforeEach(() => {
        userStub = sinon.stub(User, 'findOne');
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('POST /api/users/register', () => {
        it('should register a new user successfully', async () => {
            const mockUser = {
                id: 1,
                username: 'testuser',
                password: await bcrypt.hash('password', 10),
            };

            userStub.resolves(null);
            sinon.stub(User, 'create').resolves(mockUser);

            const res = await chai.request(app).post('/api/users/register').send({
                username: 'testuser',
                password: 'password',
            });

            expect(res).to.have.status(201);
            expect(res.body).to.have.property('status', true);
            expect(res.body).to.have.property('token');
        });

        it('should return 409 if user already exists', async () => {
            userStub.resolves({ username: 'testuser' });

            const res = await chai.request(app).post('/api/users/register').send({
                username: 'testuser',
                password: 'password',
            });

            expect(res).to.have.status(409);
            expect(res.body).to.have.property('status', false);
            expect(res.body).to.have.property('message', 'Пользователь с таким именем уже существует');
        });

        it('should return 500 on server error', async () => {
            userStub.rejects(new Error('Test error'));

            const res = await chai.request(app).post('/api/users/register').send({
                username: 'testuser',
                password: 'password',
            });

            expect(res).to.have.status(500);
            expect(res.body).to.have.property('status', false);
            expect(res.body).to.have.property('message', 'Ошибка при регистрации пользователя');
        });
    });

    describe('POST /api/users/login', () => {
        it('should login successfully with valid credentials', async () => {
            const hashedPassword = await bcrypt.hash('password', 10);
            const mockUser = { id: 1, username: 'testuser', password: hashedPassword };

            userStub.resolves(mockUser);

            const res = await chai.request(app).post('/api/users/login').send({
                username: 'testuser',
                password: 'password',
            });

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('status', true);
            expect(res.body).to.have.property('token');
        });

        it('should return 404 if user is not found', async () => {
            userStub.resolves(null);

            const res = await chai.request(app).post('/api/users/login').send({
                username: 'nonexistentuser',
                password: 'password',
            });

            expect(res).to.have.status(404);
            expect(res.body).to.have.property('status', false);
            expect(res.body).to.have.property('message', 'Пользователь с именем nonexistentuser не найден');
        });

        it('should return 401 if password is incorrect', async () => {
            const mockUser = { id: 1, username: 'testuser', password: await bcrypt.hash('password', 10) };

            userStub.resolves(mockUser);

            const res = await chai.request(app).post('/api/users/login').send({
                username: 'testuser',
                password: 'wrongpassword',
            });

            expect(res).to.have.status(401);
            expect(res.body).to.have.property('status', false);
            expect(res.body).to.have.property('message', 'Неверные учетные данные');
        });
    });
});
