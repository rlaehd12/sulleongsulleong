# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Beer(models.Model):
    id = models.BigAutoField(primary_key=True)
    abv = models.FloatField(blank=True, null=True)
    appearance = models.BigIntegerField(blank=True, null=True)
    aroma = models.BigIntegerField(blank=True, null=True)
    brewer_id = models.BigIntegerField(blank=True, null=True)
    country = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    flavor = models.BigIntegerField(blank=True, null=True)
    large_category = models.CharField(max_length=255, blank=True, null=True)
    mouthfeel = models.BigIntegerField(blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    name_kor = models.CharField(max_length=255, blank=True, null=True)
    overall = models.BigIntegerField(blank=True, null=True)
    review_count = models.IntegerField(blank=True, null=True)
    sub_category = models.CharField(max_length=255, blank=True, null=True)
    class_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'beer'


class LearningDataset(models.Model):
    member_id = models.BigIntegerField(blank=True, null=True)
    overall = models.BigIntegerField(blank=True, null=True)
    abv = models.FloatField(blank=True, null=True)
    review_count = models.BigIntegerField(blank=True, null=True)
    country_ar = models.FloatField(db_column='country_AR', blank=True, null=True)  # Field name made lowercase.
    country_at = models.FloatField(db_column='country_AT', blank=True, null=True)  # Field name made lowercase.
    country_au = models.FloatField(db_column='country_AU', blank=True, null=True)  # Field name made lowercase.
    country_be = models.FloatField(db_column='country_BE', blank=True, null=True)  # Field name made lowercase.
    country_ca = models.FloatField(db_column='country_CA', blank=True, null=True)  # Field name made lowercase.
    country_cn = models.FloatField(db_column='country_CN', blank=True, null=True)  # Field name made lowercase.
    country_cz = models.FloatField(db_column='country_CZ', blank=True, null=True)  # Field name made lowercase.
    country_de = models.FloatField(db_column='country_DE', blank=True, null=True)  # Field name made lowercase.
    country_dk = models.FloatField(db_column='country_DK', blank=True, null=True)  # Field name made lowercase.
    country_do = models.FloatField(db_column='country_DO', blank=True, null=True)  # Field name made lowercase.
    country_fi = models.FloatField(db_column='country_FI', blank=True, null=True)  # Field name made lowercase.
    country_fr = models.FloatField(db_column='country_FR', blank=True, null=True)  # Field name made lowercase.
    country_gb = models.FloatField(db_column='country_GB', blank=True, null=True)  # Field name made lowercase.
    country_hr = models.FloatField(db_column='country_HR', blank=True, null=True)  # Field name made lowercase.
    country_ie = models.FloatField(db_column='country_IE', blank=True, null=True)  # Field name made lowercase.
    country_it = models.FloatField(db_column='country_IT', blank=True, null=True)  # Field name made lowercase.
    country_jp = models.FloatField(db_column='country_JP', blank=True, null=True)  # Field name made lowercase.
    country_kr = models.FloatField(db_column='country_KR', blank=True, null=True)  # Field name made lowercase.
    country_mx = models.FloatField(db_column='country_MX', blank=True, null=True)  # Field name made lowercase.
    country_nl = models.FloatField(db_column='country_NL', blank=True, null=True)  # Field name made lowercase.
    country_nz = models.FloatField(db_column='country_NZ', blank=True, null=True)  # Field name made lowercase.
    country_pl = models.FloatField(db_column='country_PL', blank=True, null=True)  # Field name made lowercase.
    country_se = models.FloatField(db_column='country_SE', blank=True, null=True)  # Field name made lowercase.
    country_sg = models.FloatField(db_column='country_SG', blank=True, null=True)  # Field name made lowercase.
    country_th = models.FloatField(db_column='country_TH', blank=True, null=True)  # Field name made lowercase.
    country_tr = models.FloatField(db_column='country_TR', blank=True, null=True)  # Field name made lowercase.
    country_us = models.FloatField(db_column='country_US', blank=True, null=True)  # Field name made lowercase.
    country_none = models.FloatField(db_column='country_None', blank=True, null=True)  # Field name made lowercase.
    large_category_ales = models.FloatField(db_column='large_category_Ales', blank=True, null=True)  # Field name made lowercase.
    large_category_cider_mead_sake = models.FloatField(db_column='large_category_Cider, Mead, Sake', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    large_category_lagers = models.FloatField(db_column='large_category_Lagers', blank=True, null=True)  # Field name made lowercase.
    large_category_other_styles = models.FloatField(db_column='large_category_Other Styles', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    large_category_sour_beer = models.FloatField(db_column='large_category_Sour Beer', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    large_category_stout_and_porter = models.FloatField(db_column='large_category_Stout and Porter', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    large_category_wheat_beer = models.FloatField(db_column='large_category_Wheat Beer', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_abbey_dubbel = models.FloatField(db_column='sub_category_Abbey Dubbel', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_abbey_tripel = models.FloatField(db_column='sub_category_Abbey Tripel', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_abt_quadrupel = models.FloatField(db_column='sub_category_Abt/Quadrupel', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_altbier = models.FloatField(db_column='sub_category_Altbier', blank=True, null=True)  # Field name made lowercase.
    sub_category_amber_ale = models.FloatField(db_column='sub_category_Amber Ale', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_american_dark_lager = models.FloatField(db_column='sub_category_American Dark Lager', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_american_pale_ale = models.FloatField(db_column='sub_category_American Pale Ale', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_american_strong_ale = models.FloatField(db_column='sub_category_American Strong Ale', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_baltic_porter = models.FloatField(db_column='sub_category_Baltic Porter', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_barley_wine = models.FloatField(db_column='sub_category_Barley Wine', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_belgian_ale = models.FloatField(db_column='sub_category_Belgian Ale', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_belgian_strong_ale = models.FloatField(db_column='sub_category_Belgian Strong Ale', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_belgian_white_40_witbier_41_field = models.FloatField(db_column='sub_category_Belgian White &#40;Witbier&#41;', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters. Field renamed because it ended with '_'.
    sub_category_berliner_weisse = models.FloatField(db_column='sub_category_Berliner Weisse', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_bitter = models.FloatField(db_column='sub_category_Bitter', blank=True, null=True)  # Field name made lowercase.
    sub_category_bière_de_garde = models.FloatField(db_column='sub_category_Bière de Garde', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_black_ipa = models.FloatField(db_column='sub_category_Black IPA', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_bohemian_pilsener = models.FloatField(db_column='sub_category_Bohemian Pilsener', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_brown_ale = models.FloatField(db_column='sub_category_Brown Ale', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_california_common = models.FloatField(db_column='sub_category_California Common', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_cider = models.FloatField(db_column='sub_category_Cider', blank=True, null=True)  # Field name made lowercase.
    sub_category_classic_german_pilsener = models.FloatField(db_column='sub_category_Classic German Pilsener', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_cream_ale = models.FloatField(db_column='sub_category_Cream Ale', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_doppelbock = models.FloatField(db_column='sub_category_Doppelbock', blank=True, null=True)  # Field name made lowercase.
    sub_category_dortmunder_helles = models.FloatField(db_column='sub_category_Dortmunder/Helles', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_dry_stout = models.FloatField(db_column='sub_category_Dry Stout', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_dunkel = models.FloatField(db_column='sub_category_Dunkel', blank=True, null=True)  # Field name made lowercase.
    sub_category_dunkelweizen = models.FloatField(db_column='sub_category_Dunkelweizen', blank=True, null=True)  # Field name made lowercase.
    sub_category_dunkler_bock = models.FloatField(db_column='sub_category_Dunkler Bock', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_eisbock = models.FloatField(db_column='sub_category_Eisbock', blank=True, null=True)  # Field name made lowercase.
    sub_category_english_pale_ale = models.FloatField(db_column='sub_category_English Pale Ale', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_english_strong_ale = models.FloatField(db_column='sub_category_English Strong Ale', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_foreign_stout = models.FloatField(db_column='sub_category_Foreign Stout', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_fruit_beer = models.FloatField(db_column='sub_category_Fruit Beer', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_german_hefeweizen = models.FloatField(db_column='sub_category_German Hefeweizen', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_german_kristallweizen = models.FloatField(db_column='sub_category_German Kristallweizen', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_golden_ale_blond_ale = models.FloatField(db_column='sub_category_Golden Ale/Blond Ale', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_heller_bock = models.FloatField(db_column='sub_category_Heller Bock', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_ice_cider_perry = models.FloatField(db_column='sub_category_Ice Cider/Perry', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_imperial_stout = models.FloatField(db_column='sub_category_Imperial Stout', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_imperial_double_ipa = models.FloatField(db_column='sub_category_Imperial/Double IPA', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_imperial_strong_porter = models.FloatField(db_column='sub_category_Imperial/Strong Porter', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_india_pale_ale_40_ipa_41_field = models.FloatField(db_column='sub_category_India Pale Ale &#40;IPA&#41;', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters. Field renamed because it ended with '_'.
    sub_category_irish_ale = models.FloatField(db_column='sub_category_Irish Ale', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_kölsch = models.FloatField(db_column='sub_category_Kölsch', blank=True, null=True)  # Field name made lowercase.
    sub_category_lambic_faro = models.FloatField(db_column='sub_category_Lambic - Faro', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_lambic_fruit = models.FloatField(db_column='sub_category_Lambic - Fruit', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_lambic_gueuze = models.FloatField(db_column='sub_category_Lambic - Gueuze', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_lambic_unblended = models.FloatField(db_column='sub_category_Lambic - Unblended', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_low_alcohol = models.FloatField(db_column='sub_category_Low Alcohol', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_malt_liquor = models.FloatField(db_column='sub_category_Malt Liquor', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_mead = models.FloatField(db_column='sub_category_Mead', blank=True, null=True)  # Field name made lowercase.
    sub_category_mild_ale = models.FloatField(db_column='sub_category_Mild Ale', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_oktoberfest_märzen = models.FloatField(db_column='sub_category_Oktoberfest/Märzen', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_old_ale = models.FloatField(db_column='sub_category_Old Ale', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_pale_lager = models.FloatField(db_column='sub_category_Pale Lager', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_perry = models.FloatField(db_column='sub_category_Perry', blank=True, null=True)  # Field name made lowercase.
    sub_category_pilsener = models.FloatField(db_column='sub_category_Pilsener', blank=True, null=True)  # Field name made lowercase.
    sub_category_porter = models.FloatField(db_column='sub_category_Porter', blank=True, null=True)  # Field name made lowercase.
    sub_category_premium_bitter_esb = models.FloatField(db_column='sub_category_Premium Bitter/ESB', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_premium_lager = models.FloatField(db_column='sub_category_Premium Lager', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_saison = models.FloatField(db_column='sub_category_Saison', blank=True, null=True)  # Field name made lowercase.
    sub_category_saké_daiginjo = models.FloatField(db_column='sub_category_Saké - Daiginjo', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_saké_futsu_shu = models.FloatField(db_column='sub_category_Saké - Futsu-shu', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_saké_genshu = models.FloatField(db_column='sub_category_Saké - Genshu', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_saké_ginjo = models.FloatField(db_column='sub_category_Saké - Ginjo', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_saké_honjozo = models.FloatField(db_column='sub_category_Saké - Honjozo', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_saké_infused = models.FloatField(db_column='sub_category_Saké - Infused', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_saké_junmai = models.FloatField(db_column='sub_category_Saké - Junmai', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_saké_koshu = models.FloatField(db_column='sub_category_Saké - Koshu', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_saké_namasaké = models.FloatField(db_column='sub_category_Saké - Namasaké', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_saké_nigori = models.FloatField(db_column='sub_category_Saké - Nigori', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_saké_taru = models.FloatField(db_column='sub_category_Saké - Taru', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_saké_tokubetsu = models.FloatField(db_column='sub_category_Saké - Tokubetsu', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_schwarzbier = models.FloatField(db_column='sub_category_Schwarzbier', blank=True, null=True)  # Field name made lowercase.
    sub_category_scotch_ale = models.FloatField(db_column='sub_category_Scotch Ale', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_scottish_ale = models.FloatField(db_column='sub_category_Scottish Ale', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_smoked = models.FloatField(db_column='sub_category_Smoked', blank=True, null=True)  # Field name made lowercase.
    sub_category_sour_ale_wild_ale = models.FloatField(db_column='sub_category_Sour Ale/Wild Ale', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_specialty_grain = models.FloatField(db_column='sub_category_Specialty Grain', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_spice_herb_vegetable = models.FloatField(db_column='sub_category_Spice/Herb/Vegetable', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_stout = models.FloatField(db_column='sub_category_Stout', blank=True, null=True)  # Field name made lowercase.
    sub_category_strong_pale_lager_imperial_pils = models.FloatField(db_column='sub_category_Strong Pale Lager/Imperial Pils', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_sweet_stout = models.FloatField(db_column='sub_category_Sweet Stout', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_traditional_ale = models.FloatField(db_column='sub_category_Traditional Ale', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_vienna = models.FloatField(db_column='sub_category_Vienna', blank=True, null=True)  # Field name made lowercase.
    sub_category_weizen_bock = models.FloatField(db_column='sub_category_Weizen Bock', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_wheat_ale = models.FloatField(db_column='sub_category_Wheat Ale', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sub_category_zwickel_keller_landbier = models.FloatField(db_column='sub_category_Zwickel/Keller/Landbier', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    divide_size = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'learning_dataset'


class Member(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)
    email = models.CharField(unique=True, max_length=255)
    gender = models.CharField(max_length=255, blank=True, null=True)
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'member'


class Preference(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    choice = models.BooleanField()
    beer = models.ForeignKey(Beer, models.DO_NOTHING, blank=True, null=True)
    member = models.ForeignKey(Member, models.DO_NOTHING, blank=True, null=True)
    beer_beer = models.ForeignKey(Beer, models.DO_NOTHING, related_name='preference_beer_beer_set', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'preference'


class Recommend(models.Model):
    id = models.BigAutoField(primary_key=True)
    beer1 = models.BigIntegerField(blank=True, null=True)
    beer2 = models.BigIntegerField(blank=True, null=True)
    distance = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'recommend'


class Review(models.Model):
    id = models.BigAutoField(primary_key=True)
    appearance = models.IntegerField(blank=True, null=True)
    aroma = models.IntegerField(blank=True, null=True)
    content = models.TextField(blank=True, null=True)
    flavor = models.IntegerField(blank=True, null=True)
    mouthfeel = models.IntegerField(blank=True, null=True)
    overall = models.IntegerField(blank=True, null=True)
    beer = models.ForeignKey(Beer, models.DO_NOTHING, blank=True, null=True)
    member = models.ForeignKey(Member, models.DO_NOTHING, blank=True, null=True)
    score = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'review'
