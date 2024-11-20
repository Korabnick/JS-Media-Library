// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const sinon = require('sinon');
// const jwt = require('jsonwebtoken');
// const app = require('../server');
// const User = require('../models/user');
// const MediaItem = require('../models/mediaItem');
// const bcrypt = require('bcryptjs');
// const { expect } = chai;

// chai.use(chaiHttp);

// describe('Media Routes', () => {
//     let token;
//     let userStub;

//     beforeEach(async () => {
//         const mockUser = {
//             id: 1,
//             username: 'testuser',
//             password: await bcrypt.hash('password', 10),
//         };

//         userStub = sinon.stub(User, 'create').resolves(mockUser);

//         const registerRes = await chai.request(app).post('/api/users/register').send({
//             username: 'testuser',
//             password: 'password',
//         });

//         token = jwt.sign({ userId: 1, username: 'testuser' }, 'another_cake_is_a_lie', { expiresIn: '1h' });

//         sinon.stub(MediaItem, 'create');
//         sinon.stub(MediaItem, 'findAll');
//         sinon.stub(MediaItem, 'findByPk');
//     });

//     afterEach(() => {
//         sinon.restore();
//     });

//     describe('POST /api/media', () => {
//         it('should create a new media item successfully', async () => {
//             const mockMedia = {
//                 id: 1,
//                 title: 'Test Media',
//                 type: 'movie',
//                 status: 'in-progress',
//                 progress: 50,
//                 userId: 1,
//             };

//             MediaItem.create.resolves(mockMedia);

//             const res = await chai
//                 .request(app)
//                 .post('/api/media')
//                 .set('Authorization', `Bearer ${token}`)
//                 .send({
//                     title: 'Test Media',
//                     type: 'movie',
//                     status: 'in-progress',
//                     progress: 50,
//                 });

//             expect(res).to.have.status(201);
//             expect(res.body).to.have.property('status', true);
//             expect(res.body.data).to.have.property('title', 'Test Media');
//         });

//         it('should return 400 if required fields are missing', async () => {
//             const res = await chai
//                 .request(app)
//                 .post('/api/media')
//                 .set('Authorization', `Bearer ${token}`)
//                 .send({});

//             expect(res).to.have.status(400);
//             expect(res.body).to.have.property('status', false);
//             expect(res.body).to.have.property('message', 'Все поля обязательны для заполнения');
//         });
//     });

//     describe('GET /api/media', () => {
//         it('should retrieve all media items', async () => {
//             const mockMedia = [
//                 { id: 1, title: 'Test Media', type: 'movie', status: 'in-progress', progress: 50, userId: 1 },
//             ];

//             MediaItem.findAll.resolves(mockMedia);

//             const res = await chai
//                 .request(app)
//                 .get('/api/media')
//                 .set('Authorization', `Bearer ${token}`);

//             expect(res).to.have.status(200);
//             expect(res.body).to.have.property('status', true);
//             expect(res.body.data).to.be.an('array').that.has.length(1);
//         });

//         it('should return 404 if no media items are found', async () => {
//             MediaItem.findAll.resolves([]);

//             const res = await chai
//                 .request(app)
//                 .get('/api/media')
//                 .set('Authorization', `Bearer ${token}`);

//             expect(res).to.have.status(404);
//             expect(res.body).to.have.property('status', false);
//             expect(res.body).to.have.property('message', 'Медиа не найдены');
//         });
//     });

//     describe('PUT /api/media/:id', () => {
//         it('should update a media item successfully', async () => {
//             const mockMedia = {
//                 id: 1,
//                 title: 'Test Media',
//                 type: 'movie',
//                 status: 'in-progress',
//                 progress: 50,
//                 userId: 1,
//                 update: sinon.stub().resolves(),
//             };

//             MediaItem.findByPk.resolves(mockMedia);

//             const res = await chai
//                 .request(app)
//                 .put('/api/media/1')
//                 .set('Authorization', `Bearer ${token}`)
//                 .send({ status: 'completed', progress: 100 });

//             expect(res).to.have.status(200);
//             expect(res.body).to.have.property('status', true);
//             expect(res.body.data).to.have.property('status', 'completed');
//         });

//         it('should return 404 if media item is not found', async () => {
//             MediaItem.findByPk.resolves(null);

//             const res = await chai
//                 .request(app)
//                 .put('/api/media/999')
//                 .set('Authorization', `Bearer ${token}`)
//                 .send({ status: 'completed', progress: 100 });

//             expect(res).to.have.status(404);
//             expect(res.body).to.have.property('status', false);
//             expect(res.body).to.have.property('message', 'Медиа не найдено');
//         });
//     });

//     describe('DELETE /api/media/:id', () => {
//         it('should delete a media item successfully', async () => {
//             const mockMedia = {
//                 id: 1,
//                 title: 'Test Media',
//                 destroy: sinon.stub().resolves(),
//             };

//             MediaItem.findByPk.resolves(mockMedia);

//             const res = await chai
//                 .request(app)
//                 .delete('/api/media/1')
//                 .set('Authorization', `Bearer ${token}`);

//             expect(res).to.have.status(204);
//         });

//         it('should return 404 if media item is not found', async () => {
//             MediaItem.findByPk.resolves(null);

//             const res = await chai
//                 .request(app)
//                 .delete('/api/media/999')
//                 .set('Authorization', `Bearer ${token}`);

//             expect(res).to.have.status(404);
//             expect(res.body).to.have.property('status', false);
//             expect(res.body).to.have.property('message', 'Медиа не найдено');
//         });
//     });
// });
