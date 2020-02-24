/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

/*
    //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
    //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
    //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝
    'GET /':                   { action: 'view-homepage-or-redirect' },
    'GET /welcome/:unused?':   { action: 'dashboard/view-welcome' },

    'GET /faq':                { action:   'view-faq' },
    'GET /legal/terms':        { action:   'legal/view-terms' },
    'GET /legal/privacy':      { action:   'legal/view-privacy' },
    'GET /contact':            { action:   'view-contact' },

    'GET /signup':             { action: 'entrance/view-signup' },
    'GET /email/confirm':      { action: 'entrance/confirm-email' },
    'GET /email/confirmed':    { action: 'entrance/view-confirmed-email' },

    'GET /login':              { action: 'entrance/view-login' },
    'GET /password/forgot':    { action: 'entrance/view-forgot-password' },
    'GET /password/new':       { action: 'entrance/view-new-password' },

    'GET /account':            { action: 'account/view-account-overview' },
    'GET /account/password':   { action: 'account/view-edit-password' },
    'GET /account/profile':    { action: 'account/view-edit-profile' },


    //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗   ┬   ╔╦╗╔═╗╦ ╦╔╗╔╦  ╔═╗╔═╗╔╦╗╔═╗
    //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗  ┌┼─   ║║║ ║║║║║║║║  ║ ║╠═╣ ║║╚═╗
    //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝  └┘   ═╩╝╚═╝╚╩╝╝╚╝╩═╝╚═╝╩ ╩═╩╝╚═╝
    '/terms':                   '/legal/terms',
    '/logout':                  '/api/v1/account/logout',


    //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
    //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
    //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝
    // …

    */

    //
    //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
    //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
    //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
    //#region APIs
    //AUTH
    'POST   /api/users/register': {
        controller: 'users/Auth',
        action: 'registerUser',
        skipAssets: true
    },
    'POST   /api/users/login': {
        controller: 'users/Auth',
        action: 'loginUser',
        skipAssets: true
    },
    'DELETE   /api/users/logout': {
        controller: 'users/Auth',
        action: 'logoutUser',
        skipAssets: true
    },
    'POST   /api/users/refresh': {
        controller: 'users/Auth',
        action: 'refreshUserToken',
        skipAssets: true
    },

    //USERS
    'GET    /api/users/:userId': {
        controller: 'users/User',
        action: 'getUser',
        skipAssets: true
    },
    'DELETE   /api/users/:userId': {
        controller: 'users/User',
        action: 'deleteUser',
        skipAssets: true
    },
    'PUT   /api/users/:userId': {
        controller: 'users/User',
        action: 'updateUser',
        skipAssets: true
    },

    //BOARDS
    'GET    /api/boards/:boardId': {
        controller: 'boards/Board',
        action: 'getBoard',
        skipAssets: true
    },
    'POST   /api/boards/create': {
        controller: 'boards/Board',
        action: 'createBoard',
        skipAssets: true
    },
    'DELETE   /api/boards/:boardId': {
        controller: 'boards/Board',
        action: 'deleteBoard',
        skipAssets: true
    },
    'PUT   /api/boards/:boardId': {
        controller: 'boards/Board',
        action: 'updateBoard',
        skipAssets: true
    },


    //POSTS
    'POST   /api/boards/:boardId/new': {
        controller: 'posts/Post',
        action: 'newPost',
        skipAssets: true
    },
    'GET   /api/posts/:postId': {
        controller: 'posts/Post',
        action: 'getPost',
        skipAssets: true
    },
    'GET   /api/posts/all/:boardId': {
        controller: 'posts/Post',
        action: 'searchPost',
        skipAssets: true
    },
    'DELETE   /api/posts/:postId': {
        controller: 'posts/Post',
        action: 'deletePost',
        skipAssets: true
    },
    'PUT   /api/posts/:postId': {
        controller: 'posts/Post',
        action: 'updatePost',
        skipAssets: true
    },
    //#endregion

    //Default
    '/*': {
        controller: 'App',
        action: 'serve',
        skipAssets: true,
        skipRegex: /^\/api\/.*$/
    }
};
