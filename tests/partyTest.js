import chai from 'chai';
import chaihttp from 'chai-http';
import chaiThing from 'chai-things';
import app from '..';

chai.should();
chai.use(chaihttp);
chai.use(chaiThing);

let adminToken;
before((done) => {
  const admin = {
    email: 'admin@gmail.com',
    password: '123456'
  };

  chai.request(app).post('/api/v1/auth/login')
    .send(admin)
    .end((err, res) => {
      adminToken = res.body.data[0].token;
      done();
    });
});

describe('Political Parties tests', () => {
  it('Should POST (Create) a party', (done) => {
    const party = {
      partyname: 'Democratic',
      hqAddress: 'Washington, D.C.',
      logoUrl: 'https://www.stjoedemocrats.org/wp-content/uploads/2017/09/D-Logo-Only-small-300x230.jpg',
    };

    chai.request(app)
      .post('/api/v1/parties')
      .send(party)
      .set('access-token', adminToken)
      .end((_err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        res.body.data.should.all.have.property('name', party.partyname);
        res.body.data.should.all.have.property('hqaddress', party.hqAddress);
        res.body.data.should.all.have.property('logourl', party.logourl);
        done();
      });
  });

  it('Should GET all parties', (done) => {
    chai.request(app)
      .get('/api/v1/parties')
      .set('access-token', adminToken)
      .end((_err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        res.body.data.should.all.have.property('id');
        res.body.data.should.all.have.property('name');
        res.body.data.should.all.have.property('hqaddress');
        res.body.data.should.all.have.property('logourl');
        res.body.data.should.all.have.property('createdOn');
        done();
      });
  });

  it('Should GET a party', (done) => {
    const party = { id: 1 };

    chai.request(app)
      .get('/api/v1/parties/' + party.id + '')
      .set('access-token', adminToken)
      .end((_err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        res.body.data.should.all.have.property('id');
        res.body.data.should.all.have.property('name');
        res.body.data.should.all.have.property('hqaddress');
        res.body.data.should.all.have.property('logourl');
        res.body.data.should.all.have.property('createdOn');
        done();
      });
  });

  it('Should UPDATE a party', (done) => {
    const party = { id: 1 };
    const name = { name: 'Kigali' };

    chai.request(app)
      .patch('/api/v1/parties/' + party.id + '/partyname')
      .send(name)
      .set('access-token', adminToken)
      .end((_err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        res.body.data.should.all.have.property('id');
        res.body.data.should.all.have.property('partyname');
        res.body.data.should.all.have.property('hqaddress');
        res.body.data.should.all.have.property('logourl');
        res.body.data.should.all.have.property('createdOn');
        done();
      });
  });

  it('Should DELETE a party', (done) => {
    const party = { id: 1 };

    chai.request(app)
      .delete('/api/v1/parties/' + party.id + '')
      .set('access-token', adminToken)
      .end((_err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        res.body.data.should.all.have.property('message');
        done();
      });
  });
});