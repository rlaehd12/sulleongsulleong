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

    class Meta:
        managed = False
        db_table = 'beer'


class LearningDataset(models.Model):
    member_id = models.BigIntegerField(blank=True, primary_key=True)
    overall = models.BigIntegerField(blank=True, null=True)
    abv = models.FloatField(blank=True, null=True)
    review_count = models.BigIntegerField(blank=True, null=True)
    country_AR = models.FloatField(blank=True, null=True)
    country_AT = models.FloatField(blank=True, null=True)
    country_AU = models.FloatField(blank=True, null=True)
    country_BE = models.FloatField(blank=True, null=True)
    country_CA = models.FloatField(blank=True, null=True)
    country_CN = models.FloatField(blank=True, null=True)
    country_CZ = models.FloatField(blank=True, null=True)
    country_DE = models.FloatField(blank=True, null=True)
    country_DK = models.FloatField(blank=True, null=True)
    country_DO = models.FloatField(blank=True, null=True)
    country_FI = models.FloatField(blank=True, null=True)
    country_FR = models.FloatField(blank=True, null=True)
    country_GB = models.FloatField(blank=True, null=True)
    country_HR = models.FloatField(blank=True, null=True)
    country_IE = models.FloatField(blank=True, null=True)
    country_IT = models.FloatField(blank=True, null=True)
    country_JP = models.FloatField(blank=True, null=True)
    country_KR = models.FloatField(blank=True, null=True)
    country_MX = models.FloatField(blank=True, null=True)
    country_NL = models.FloatField(blank=True, null=True)
    country_NZ = models.FloatField(blank=True, null=True)
    country_PL = models.FloatField(blank=True, null=True)
    country_SE = models.FloatField(blank=True, null=True)
    country_SG = models.FloatField(blank=True, null=True)
    country_TH = models.FloatField(blank=True, null=True)
    country_TR = models.FloatField(blank=True, null=True)
    country_US = models.FloatField(blank=True, null=True)
    country_None = models.FloatField(blank=True, null=True)
    large_category_Ales = models.FloatField(blank=True, null=True)
    large_category_Cider_Mead_Sake = models.FloatField(db_column='large_category_Cider, Mead, Sake', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    large_category_Lagers = models.FloatField(blank=True, null=True)
    large_category_Other_Styles = models.FloatField(db_column='large_category_Other Styles', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    large_category_Sour_Beer = models.FloatField(db_column='large_category_Sour Beer', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    large_category_Stout_and_Porter = models.FloatField(db_column='large_category_Stout and Porter', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    large_category_Wheat_Beer = models.FloatField(db_column='large_category_Wheat Beer', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Abbey_Dubbel = models.FloatField(db_column='sub_category_Abbey Dubbel', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Abbey_Tripel = models.FloatField(db_column='sub_category_Abbey Tripel', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Abt_Quadrupel = models.FloatField(db_column='sub_category_Abt/Quadrupel', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Altbier = models.FloatField(blank=True, null=True)
    sub_category_Amber_Ale = models.FloatField(db_column='sub_category_Amber Ale', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_American_Dark_Lager = models.FloatField(db_column='sub_category_American Dark Lager', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_American_Pale_Ale = models.FloatField(db_column='sub_category_American Pale Ale', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_American_Strong_Ale = models.FloatField(db_column='sub_category_American Strong Ale', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Baltic_Porter = models.FloatField(db_column='sub_category_Baltic Porter', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Barley_Wine = models.FloatField(db_column='sub_category_Barley Wine', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Belgian_Ale = models.FloatField(db_column='sub_category_Belgian Ale', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Belgian_Strong_Ale = models.FloatField(db_column='sub_category_Belgian Strong Ale', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Belgian_White_40_Witbier_41_field = models.FloatField(db_column='sub_category_Belgian White &#40;Witbier&#41;', blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it ended with '_'.
    sub_category_Berliner_Weisse = models.FloatField(db_column='sub_category_Berliner Weisse', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Bitter = models.FloatField(blank=True, null=True)
    sub_category_Bière_de_Garde = models.FloatField(db_column='sub_category_Bière de Garde', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Black_IPA = models.FloatField(db_column='sub_category_Black IPA', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Bohemian_Pilsener = models.FloatField(db_column='sub_category_Bohemian Pilsener', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Brown_Ale = models.FloatField(db_column='sub_category_Brown Ale', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_California_Common = models.FloatField(db_column='sub_category_California Common', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Cider = models.FloatField(blank=True, null=True)
    sub_category_Classic_German_Pilsener = models.FloatField(db_column='sub_category_Classic German Pilsener', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Cream_Ale = models.FloatField(db_column='sub_category_Cream Ale', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Doppelbock = models.FloatField(blank=True, null=True)
    sub_category_Dortmunder_Helles = models.FloatField(db_column='sub_category_Dortmunder/Helles', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Dry_Stout = models.FloatField(db_column='sub_category_Dry Stout', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Dunkel = models.FloatField(blank=True, null=True)
    sub_category_Dunkelweizen = models.FloatField(blank=True, null=True)
    sub_category_Dunkler_Bock = models.FloatField(db_column='sub_category_Dunkler Bock', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Eisbock = models.FloatField(blank=True, null=True)
    sub_category_English_Pale_Ale = models.FloatField(db_column='sub_category_English Pale Ale', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_English_Strong_Ale = models.FloatField(db_column='sub_category_English Strong Ale', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Foreign_Stout = models.FloatField(db_column='sub_category_Foreign Stout', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Fruit_Beer = models.FloatField(db_column='sub_category_Fruit Beer', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_German_Hefeweizen = models.FloatField(db_column='sub_category_German Hefeweizen', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_German_Kristallweizen = models.FloatField(db_column='sub_category_German Kristallweizen', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Golden_Ale_Blond_Ale = models.FloatField(db_column='sub_category_Golden Ale/Blond Ale', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Heller_Bock = models.FloatField(db_column='sub_category_Heller Bock', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Ice_Cider_Perry = models.FloatField(db_column='sub_category_Ice Cider/Perry', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Imperial_Stout = models.FloatField(db_column='sub_category_Imperial Stout', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Imperial_Double_IPA = models.FloatField(db_column='sub_category_Imperial/Double IPA', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Imperial_Strong_Porter = models.FloatField(db_column='sub_category_Imperial/Strong Porter', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_India_Pale_Ale_40_IPA_41_field = models.FloatField(db_column='sub_category_India Pale Ale &#40;IPA&#41;', blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it ended with '_'.
    sub_category_Irish_Ale = models.FloatField(db_column='sub_category_Irish Ale', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Kölsch = models.FloatField(blank=True, null=True)
    sub_category_Lambic_Faro = models.FloatField(db_column='sub_category_Lambic - Faro', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Lambic_Fruit = models.FloatField(db_column='sub_category_Lambic - Fruit', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Lambic_Gueuze = models.FloatField(db_column='sub_category_Lambic - Gueuze', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Lambic_Unblended = models.FloatField(db_column='sub_category_Lambic - Unblended', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Low_Alcohol = models.FloatField(db_column='sub_category_Low Alcohol', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Malt_Liquor = models.FloatField(db_column='sub_category_Malt Liquor', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Mead = models.FloatField(blank=True, null=True)
    sub_category_Mild_Ale = models.FloatField(db_column='sub_category_Mild Ale', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Oktoberfest_Märzen = models.FloatField(db_column='sub_category_Oktoberfest/Märzen', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Old_Ale = models.FloatField(db_column='sub_category_Old Ale', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Pale_Lager = models.FloatField(db_column='sub_category_Pale Lager', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Perry = models.FloatField(blank=True, null=True)
    sub_category_Pilsener = models.FloatField(blank=True, null=True)
    sub_category_Porter = models.FloatField(blank=True, null=True)
    sub_category_Premium_Bitter_ESB = models.FloatField(db_column='sub_category_Premium Bitter/ESB', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Premium_Lager = models.FloatField(db_column='sub_category_Premium Lager', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Saison = models.FloatField(blank=True, null=True)
    sub_category_Saké_Daiginjo = models.FloatField(db_column='sub_category_Saké - Daiginjo', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Saké_Futsu_shu = models.FloatField(db_column='sub_category_Saké - Futsu-shu', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Saké_Genshu = models.FloatField(db_column='sub_category_Saké - Genshu', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Saké_Ginjo = models.FloatField(db_column='sub_category_Saké - Ginjo', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Saké_Honjozo = models.FloatField(db_column='sub_category_Saké - Honjozo', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Saké_Infused = models.FloatField(db_column='sub_category_Saké - Infused', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Saké_Junmai = models.FloatField(db_column='sub_category_Saké - Junmai', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Saké_Koshu = models.FloatField(db_column='sub_category_Saké - Koshu', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Saké_Namasaké = models.FloatField(db_column='sub_category_Saké - Namasaké', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Saké_Nigori = models.FloatField(db_column='sub_category_Saké - Nigori', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Saké_Taru = models.FloatField(db_column='sub_category_Saké - Taru', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Saké_Tokubetsu = models.FloatField(db_column='sub_category_Saké - Tokubetsu', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Schwarzbier = models.FloatField(blank=True, null=True)
    sub_category_Scotch_Ale = models.FloatField(db_column='sub_category_Scotch Ale', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Scottish_Ale = models.FloatField(db_column='sub_category_Scottish Ale', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Smoked = models.FloatField(blank=True, null=True)
    sub_category_Sour_Ale_Wild_Ale = models.FloatField(db_column='sub_category_Sour Ale/Wild Ale', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Specialty_Grain = models.FloatField(db_column='sub_category_Specialty Grain', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Spice_Herb_Vegetable = models.FloatField(db_column='sub_category_Spice/Herb/Vegetable', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Stout = models.FloatField(blank=True, null=True)
    sub_category_Strong_Pale_Lager_Imperial_Pils = models.FloatField(db_column='sub_category_Strong Pale Lager/Imperial Pils', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Sweet_Stout = models.FloatField(db_column='sub_category_Sweet Stout', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Traditional_Ale = models.FloatField(db_column='sub_category_Traditional Ale', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Vienna = models.FloatField(blank=True, null=True)
    sub_category_Weizen_Bock = models.FloatField(db_column='sub_category_Weizen Bock', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Wheat_Ale = models.FloatField(db_column='sub_category_Wheat Ale', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    sub_category_Zwickel_Keller_Landbier = models.FloatField(db_column='sub_category_Zwickel/Keller/Landbier', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    divide_size = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'learning_dataset'


class Member(models.Model):
    id = models.BigIntegerField(primary_key=True)
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
    id = models.BigIntegerField(primary_key=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    appearance = models.IntegerField(blank=True, null=True)
    aroma = models.IntegerField(blank=True, null=True)
    content = models.TextField(blank=True, null=True)
    flavor = models.IntegerField(blank=True, null=True)
    mouthfeel = models.IntegerField(blank=True, null=True)
    overall = models.IntegerField(blank=True, null=True)
    score = models.IntegerField(blank=True, null=True)
    beer = models.ForeignKey(Beer, models.DO_NOTHING, blank=True, null=True)
    member = models.ForeignKey(Member, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'review'
