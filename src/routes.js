import Home from "./components/mainPage/Home";
import Article from "./components/mainPage/Article";
import Category from "./components/mainPage/Category";
import Authors from "./components/mainPage/Authors";
// import Lessons from "./components/mainPage/Lessons";
import Library from "./components/mainPage/Library";
import Read from "./components/mainPage/Read";
import Search from './components/mainPage/Search';
import About from './components/mainPage/About';

import Error404 from './components/mainPage/Error404';

export const routes = [
    {
        path: '/',
        component: Home,
        name: 'home',
        meta: { title: 'home'} 
    },
    {
        path: '/home',
        component: Home,
        name: 'home',
        meta: { title: 'home'} 
    },
    {
        path: '/about',
        component: About,
        name: 'about'
    },
    {
        path: '/authors',
        component: Authors,
        name: 'author',
        meta: { title: 'author'}
    },
    {
        path: '/authors/:username',
        component: Authors,
        name: 'author?username',
        meta: { title: 'author'}
    },
    {
        path: '/authors/:username/page/:page',
        component: Authors,
        name: 'author?page',
        meta: { title: 'author'}
    },
    {
        path: '/page/:page',
        component: Home,
        name: 'home?page',
        meta: { title: 'home'} 
    },
    {
        path: '/kitabxana/:bolme',
        component: Library,
        name: 'library',
        meta: { title: 'library'}
    },
    {
        path: '/kitabxana/:bolme/page/:page',
        component: Library,
        name: 'library',
        meta: { title: 'library'}
    },
    {
        path: '/read/:seo',
        component: Read,
        name: 'read',
        meta: { title: 'read'}
    },
    {
        path: '/search/:search',
        component: Search,
        name: 'search',
        meta: { title: 'search'}
    },
    {
        path: '/search/:search/page/:page',
        component: Search,
        name: 'search',
        meta: { title: 'search'}
    },
    {
        path: '/:bolme/:seo',
        component: Article,
        name: 'article',
        meta: { title: 'article'}
    },
    {
        path: '/elm-ve-heyat/:seo/:id',
        component: Article,
        name: 'article',
        meta: { title: 'article'}
    },
    {
        path: '/tehsil/:seo/:id',
        component: Article,
        name: 'article',
        meta: { title: 'article'}
    },
    {
        path: '/:bolme',
        component: Category,
        name: 'category',
        meta: { title: 'home'}
    },
    {
        path: '/:bolme/page/:page',
        component: Category,
        name: 'category',
        meta: { title: 'category'}
    },
    {
        path: '/not-found',
        component: Error404,
        name: 'notfound'
    },
    {
        path: '*',
        component: Error404,
        name: 'redirect'
    }
]