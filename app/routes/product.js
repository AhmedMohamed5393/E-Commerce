var express            = require('express'),
    router             = express.Router(),
    bodyParser         = require('body-parser'),
    parseUrlencoded    = bodyParser.urlencoded({ extended: true }),
    methodOverride     = require('method-override'),
    authorization      = require('../middlewares/authorization'),
    authentication     = require('../middlewares/authentication'),
    maincontroller     = require('../controllers/products/access/main'),
    productscontroller = require('../controllers/products/access/products'),
    newcontroller      = require('../controllers/products/access/new'),
    editcontroller     = require('../controllers/products/access/edit'),
    showcontroller     = require('../controllers/products/access/show'),
    findercontroller   = require('../controllers/products/finder/finder'),
    cartcontroller     = require('../controllers/products/shop/cart'),
    checkoutcontroller = require('../controllers/products/shop/checkout');
router.use(methodOverride('_method'));
router.get('/', parseUrlencoded, maincontroller.GetHomePage);
router.get('/products/:page', parseUrlencoded, productscontroller.GetProductsPage);
router.get('/products/type/:type/:page', parseUrlencoded,
                                         findercontroller.GetTypeProducts);
router.get('/products/:brand/:page', parseUrlencoded,
                                     findercontroller.GetBrandProducts);
router.get('/addtocart/:id', parseUrlencoded, cartcontroller.GetAddToCardPage);
router.get('/product/cart', parseUrlencoded, cartcontroller.GetCardPage);
router.get('/product/remove/:id', parseUrlencoded, cartcontroller.DeleteCardProduct);
router.get('/product/reduce/:id', parseUrlencoded, cartcontroller.RemoveItemCard);
router.get('/product/cart/checkout', parseUrlencoded, authentication.isLoggedIn,
                                     checkoutcontroller.GetCheckoutPage);
router.post('/product/cart/checkout', parseUrlencoded, authentication.isLoggedIn,
                                      checkoutcontroller.PostCheckoutPage);
router.get('/product/new', parseUrlencoded, authentication.isLoggedIn,
                                            newcontroller.GetNewProductPage);
router.post('/product/new', parseUrlencoded, authentication.isLoggedIn,
                                             newcontroller.PostNewProductPage);
router.get('/product/:id/show', parseUrlencoded, showcontroller.GetShowProductPage);
router.get('/product/:id/edit', parseUrlencoded, authentication.isLoggedIn,
                                authorization.checkProductOwnership,
                                editcontroller.GetEditProductPage);
router.put('/product/:id', parseUrlencoded, authentication.isLoggedIn,
                           authorization.checkProductOwnership,
                           editcontroller.PutEditProductPage);
router.delete('/product/:id', parseUrlencoded, authentication.isLoggedIn,
                              authorization.checkProductOwnership,
                              editcontroller.DeleteProduct);
module.exports = router;