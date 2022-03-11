<template>
    <div id="about">
        <Header/>
        <div class="container mt-6">
			<!-- row -->
			<div class="row" style="margin-top: 30px">
				<div class="col-md-5">
					<div class="section-row">
						<div class="section-title">
							<h2 class="title">Hekayəmiz</h2>
						</div>
						<p>17 avqust 2017-ci ildə uzun zaman düşündükdən sonra saytı açmağa qərar verdik. Məqsədimiz Azərbaycan dilində elmi məqalələr yazmaq, Azərbaycan dilindəki informasiya sayını artıra bilmək idi.</p>
						<p>Universitetdə təhsil aldığımız zaman dərslərə, imtahanlara, monitorinqlərə hazırlaşarkən internetdən azərbaycanca dərsliklər tapmaq demək olar ki, mümkünsüz hala çevrilmişdi. Bunun üçün ya ingilis və rus dillərində tapdığımız məqalələri öz dilimizə çevirməli ya da kitabxanalardan məlumat əldə edib bundan istifadə etməli idik. Bu isə vaxt itkisi idi. Düzdür, artıq universiteti bitirəli 2 il olmuşdu. Ancaq gələcəkdə başqalarının da bu problemləri yaşamaması üçün, Azərbaycan dilində informasiya qıtlığına son vermək üçün biz də bir iş görməli idik və beləliklə ElmTehsil.com kollektivini yaratdıq.</p>
                        
					</div>
				</div>
				<div class="col-md-7">
					<div class="section-row">
						<div class="section-title">
							<h2 class="title">Hədəfimiz</h2>
						</div>
						<p>ElmTehsil.com olaraq elmi araşdırmaları başa düşülən, yorucu olmayan və axıcı bir dillə oxucularımıza çatdırmaq niyyətindəyik. Başlıca hədəfimiz düşünən, öyrənən bir toplumun yaranmasında çox kiçik də olsa bir rol oynamaqdır. Zamanla insanların qarşısında dayanmış cəhalət divarını dağıdacağımıza inanırıq.</p>

						<p>ElmTehsil.com kollektivi olaraq hədəflərimizdən biri də missiyamızı sadəcə internet dünyası ilə məhdudlaşdırmamaqdır. Ancaq bunun həyata keçirilməsi üçün siz oxucuların təklif və iradlarına ehtiyacımız olacaqdır.</p>
						<p>Əziz oxucular, siz <a href="https://play.google.com/store/apps/details?id=com.alibabastudio.elmtehsilcom">android tətbiqetməni</a> yükləyərək xəbərlərdən,məlumatlardan daha tez və rahat agah ola bilərsiniz.</p>
					</div>
				</div>
                <div class="col-12 mt-4 blog-post">
                    <h2 class="blockquote">
                        <p>Öyrənmək heç vaxt gec deyil.</p>
                        <footer class="blockquote-footer">elmtehsil.com</footer>
                    </h2>
                </div>
			</div>
			<!-- /row -->
		</div>
        <Footer/>
    </div>
</template>
<script>
import Header from '../pageParts/Header';
import Footer from '../pageParts/Footer';

export default {
	components:{
        Header,
        Footer
	},
	created(){
		this.$store.state.Start.title = "Haqqımızda";
	}
}
</script>