const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
  console.log(req.name);
  req.flash('error', 'Something Happened');
  res.render('index');
};

exports.addStore = (req, res) => {
  res.render('editStore', { title: 'Add Store' });
};

exports.createStore = async (req, res) => {
  console.log(req.body);
  const store = await (new Store(req.body)).save();
  //await don't move on until save has happened
  req.flash('success', `Successfully Created ${store.name}.  Care leave a review?`);
  res.redirect(`/${store.slug}`);

};

exports.getStores = async (req, res) => {
  const stores = await Store.find();
  console.log(stores);
  res.render('stores', { title: 'Stores', stores })
}
