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


class BeerCopy(models.Model):
    id = models.BigIntegerField(primary_key=True)
    abv = models.FloatField(blank=True, null=True)
    appearance = models.FloatField(blank=True, null=True)
    aroma = models.FloatField(blank=True, null=True)
    class_name = models.CharField(max_length=255, blank=True, null=True)
    country = models.CharField(max_length=255, blank=True, null=True)
    flavor = models.FloatField(blank=True, null=True)
    large_category = models.CharField(max_length=255, blank=True, null=True)
    mouthfeel = models.FloatField(blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    name_kor = models.CharField(max_length=255, blank=True, null=True)
    sub_category = models.CharField(max_length=255, blank=True, null=True)
    ratebeer_id = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'beer_copy'


class BeerMergeTest(models.Model):
    index = models.BigIntegerField(blank=True, null=True)
    beer_id = models.TextField(blank=True, null=True)
    name = models.TextField(blank=True, null=True)
    name_kor = models.TextField(blank=True, null=True)
    large_category = models.TextField(blank=True, null=True)
    sub_category = models.TextField(blank=True, null=True)
    country = models.TextField(blank=True, null=True)
    abv = models.TextField(blank=True, null=True)
    brewerid = models.TextField(blank=True, null=True)
    appearance = models.TextField(blank=True, null=True)
    aroma = models.TextField(blank=True, null=True)
    flavor = models.TextField(blank=True, null=True)
    mouthfeel = models.TextField(blank=True, null=True)
    overall = models.TextField(blank=True, null=True)
    review_count = models.BigIntegerField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    ratebeer_id = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'beer_merge_test'


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

    class Meta:
        managed = False
        db_table = 'review'
