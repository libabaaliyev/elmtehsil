import Vue from 'vue';
import Axios from 'axios';
import { router } from '../../main';
export default {
    state: {
        menuDefault:[
            {"id":"4","query":"6","name":"Dil öyrən","url":"dil-oyren","status":"deactive","categories":[]}
        ],
        menu: JSON.parse(localStorage.getItem('menu')),
        mainMenu: {
            name: "Xəbərlər",
            categories: [
            ]
        },
        tabs:[
            {
                name: "Tövsiyyə olunanlar",
                tag: 'recommended'
            },
            {
                name: "Bəyənilənlər",
                tag: 'likes'
            }
        ],
        activeTab: 'recommended',
        imageRoot: 'https://elmtehsil.com/adminlog/',
        loader: true,
        siteData:{
            title:{
                article: ""
            },
            settings:{
                logo:           "/src/img/logo_light_320x60.png",
                mainTitle:      localStorage.getItem('elmtehsil_title'),
                image:          localStorage.getItem('elmtehsil_image'),
                description:    localStorage.getItem("elmtehsil_description"),
                social: [
                    {
                        "icon": "fab fa-facebook-f",
                        "link": "https://facebook.com/elmtehsilcom",
                        "name": "Facebook"
                    },
                    {
                        "icon": "fab fa-twitter",
                        "link": "https://facebook.com/elmtehsilcom",
                        "name": "Twitter"
                    },
                    {
                        "icon": "fab fa-youtube",
                        "link": "https://facebook.com/elmtehsilcom",
                        "name": "YouTube"
                    },
                    {
                        "icon": "fab fa-instagram",
                        "link": "https://facebook.com/elmtehsilcom",
                        "name": "Instagram"
                    }
                ]
            },
            ads: []
        },
        searchCount: 0,
        pagLimit: 10,
        searchArray: [],
        title: 'Elm və Təhsil',
        description: "Öyrənmək heç vaxt gec deyil",
        image: "http://elmtehsil.com/img/kimya.jpg",
        notifications: {
            "errorInsert": {
                "title": "Bildiriş",
                "message": "Yüklənmə zamanı xəta baş verdi.",
                "icon": "error"
            },
            "errorSomething": {
                "title": "Ups",
                "message": "Gözlənilməz xəta yarandı.",
                "icon": "error"
            },
            "internet-error": {
                "title": "Bildiriş",
                "message": "İnternet bağlantısı yoxdur.",
                "icon": "error"
            }
        }
    },
    getters:{

    },
    mutations:{
        selectTab(state,tag){
            state.activeTab = tag;
        },
        startSearch(state,searchText){
            if(searchText){
                router.push("/search/"+searchText).catch(error => {
                    if (error.name != "NavigationDuplicated") {
                        throw error;
                    }
                    else{
                        location.reload();
                    }
                });
            }
        },
        notification(state,msg){
            const notif     = state.notifications[msg];
            const title     = notif.title;
            const text      = notif.message;
            const icon      = notif.icon;
            Vue.swal.fire({
                title,text,icon
            })
        },
        metaCreate(state){
            state.title       = state.siteData.settings.mainTitle
            state.description = state.siteData.settings.description
            state.image       = state.siteData.settings.image
        }
    },
    actions:{
        getDatas({commit,dispatch},payload){
            let Start   = this.state.Start;
            let News    = this.state.News;
            let base    = new FormData();
            base.append('info', 'get-data');
            Start.loader = true;
            News.pagination = 1;
            
            Axios.post("/api/elmtehsil/data.php",base).then(response=>
            {
                const data                      = response.data;
                const team                      = data.komanda;
                const categories                = data['categories'];
                const newsCount                 = data['meqale_say'];
                const popular                   = data['popular'];
                const site                      = data['site'];
                const ads                       = data['ads'];
                Start.pagLimit                  = data.limit;
                let menu                        = data.menu;
                let Settings                    = Start.siteData.settings;
                Start.siteData.ads              = ads;
                Start.mainMenu.categories       = categories;
                Start.menu                      = menu;
                Settings.mainTitle              = site.mainTitle;
                Settings.description            = site.description;
                Settings.image                  = Start.imageRoot + site.image;
                Settings.logo                   = Start.imageRoot + site.logo;
                Settings.social                 = JSON.parse(site.social);
            
                News.count                      = newsCount; 
                News.popular                    = popular;
                News.team                       = team;
                News.categories                 = categories;
                localStorage.setItem("title",site.mainTitle);
                localStorage.setItem("menu",JSON.stringify(menu));
                localStorage.setItem("popular",JSON.stringify(popular));
                localStorage.setItem("team",JSON.stringify(team));
                localStorage.setItem("categories",JSON.stringify(categories));
                localStorage.setItem("elmtehsil_title",site.mainTitle);
                localStorage.setItem("elmtehsil_description",site.description);
                localStorage.setItem("elmtehsil_image",Settings.image);
                Start.loader                    = false;
            })
            .catch(err => {
                if(err.message == 'Network Error'){
                    if(localStorage.getItem("menu") === null){
                        this.state.Start.menu = this.state.Start.menuDefault;
                        localStorage.setItem("menu",JSON.stringify(this.state.Start.menu));
                    }
                    else{
                        this.state.Start.menu = JSON.parse(localStorage.getItem("menu"));
                    }
                    
                    if(localStorage.getItem("articles")){
                        this.state.News.news = JSON.parse(localStorage.getItem("articles"));
                    }
    
                    if(localStorage.getItem("popular")){
                        this.state.News.popular = JSON.parse(localStorage.getItem("popular"));
                    }
    
                    if(localStorage.getItem("team")){
                        this.state.News.team = JSON.parse(localStorage.getItem("team"));
                    }
                    commit("notification","internet-error");
                    Start.loader                    = false;
                }
                else{
                    commit("notification","errorSomething");
                }
            })

            if(localStorage.getItem("likeArticles")){
                this.state.News.likeNews = JSON.parse(localStorage.getItem("likeArticles"));
            }
        },
        search({commit},search){
            let News            = this.state.News;
            let Start           = this.state.Start;
            Start.searchArray   = [];
            News.loader         = true;
            Start.searchCount   = 0;
            News.limit          = 10;
            News.pagination     = search.page;
            Start.title         = '“' + search.search + '“' + ' sorğusu üzrə axtarış | elmtehsil.com'
            let db              = new FormData();

            db.append("info","search");
            db.append("search",(search.search).toString());
            db.append("page",search.page);
            Axios.post("/api/elmtehsil/data.php",db)
            .then(response=>{
                const data          = response.data;
                Start.searchArray   = data.search;
                Start.searchCount   = data.count;
                Start.pagLimit      = data.limit;
                News.loader         = false;
            })
            .catch(err =>{
                const msg = err.message;
                if(msg == 'Network Error'){
                    let articles     = News.articles;
                    let searchArray  = Start.searchArray;
                    const searchText = (search.search).toLowerCase();
                    const searchSeo  = this.getters.seo(searchText);
                    for (let index = 0; index < articles.length; index++) {
                        let article      = articles[index];
                        const name       = (article.name).toLowerCase();
                        const seo        = article.seo;                        
                        if((name).match(searchText)){
                            News.count++;
                            searchArray.push(article);
                        }
                        else if((seo).match(searchSeo)){
                            News.count++;
                            searchArray.push(article);
                        }
                    }
                    Start.loader = false;
                    commit("notification",'internet-error');
                }
                else{
                    commit("notification",'errorSomething');
                }
            })
        }
    }
}