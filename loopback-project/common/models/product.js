/* eslint-disable eol-last */
/* eslint-disable indent */
'use strict';

module.exports = function(Product) {
    // Product.destroyById(id, cb)
    // Product.updateAll({}, {}, cb)
    // Product.create({}, cb)
    // Product.find({}, cb)
    // Product.findById(id, cb)

    // Custom
    Product.customMethod = function(cb) {
        cb(null, 'My first custom method');
    };
    Product.remoteMethod('customMethod', {
        returns: {
            arg: 'response',
            type: 'string',
        },
        http: {
            path: '/custon', // GET http://localhost:3000/api/products/custom
            verb: 'get',
        },
    });
    Product.byTotal = function(cb) {
        Product.find({}, function(err, data) {
            if (err) cb(err);
            if (!data) cb(null, {});

            const getQtd = function(product) {
                return product.qtd;
            };

            const sumQtd = function(qtdPrev, qtdNext) {
                return qtdPrev + qtdNext;
            };

            let total = data.map(getQtd).reduce(sumQtd);

            // eslint-disable-next-line object-curly-spacing
            cb(null, { total });
        });
    };
    Product.remoteMethod('byTotal', {
        returns: {
            arg: 'data',
            type: 'object',
        },
        http: {
            path: '/total', // GET http://localhost:3000/api/products/total
            verb: 'get',
        },
    });

    // Hooks
    Product.beforeRemote('byTotal', function(context, product, next) {
        console.log('terminal -> Before Remote Hook applied');

        next();
    });
    Product.afterRemote('byTotal', function(context, product, next) {
        console.log('terminal -> After Remote Hook applied');

        next();
    });

    // Hooks action model
    Product.observe('before save', function(ctx, next) {
        console.log('Before savings...', ctx.instance);

        next();
    });
};