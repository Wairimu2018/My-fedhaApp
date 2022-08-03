from django.contrib import admin
from .models import (AccessLevel, Right, AccessLevelRight, SystemUser, LoginTokens, PasswordReset, CompanyDetails, 
	UserTransactions, SlidingAdverts, OurServices, OurProjects, Testimonial, News, OurPartners, Messagges, 
	Department, Position, DownloadableResource, BlogArticleCategory, BlogArticle, MobileAppVersion, Gender,
	OrganizationsCategories, MemberOrganizations, Country, Town, PersonOfficialDesignation, MaritalStatus, 
	ServiceCategories, Gallery, UserAccounts, LoansRecord)

admin.site.register(AccessLevel)

admin.site.register(Right)

admin.site.register(AccessLevelRight)

admin.site.register(SystemUser)

admin.site.register(LoginTokens)

admin.site.register(PasswordReset)

admin.site.register(CompanyDetails)

admin.site.register(UserTransactions)

admin.site.register(SlidingAdverts)

admin.site.register(OurServices)

admin.site.register(OurProjects)

admin.site.register(Testimonial)

admin.site.register(News)

admin.site.register(OurPartners)

admin.site.register(Messagges)

admin.site.register(Department)

admin.site.register(Position)

admin.site.register(DownloadableResource)

admin.site.register(BlogArticleCategory)

admin.site.register(BlogArticle)

admin.site.register(MobileAppVersion)

admin.site.register(OrganizationsCategories)

admin.site.register(MemberOrganizations)

admin.site.register(Country)

admin.site.register(Town)

admin.site.register(PersonOfficialDesignation)

admin.site.register(MaritalStatus)

admin.site.register(Gender)

admin.site.register(ServiceCategories)

admin.site.register(Gallery)

admin.site.register(UserAccounts)

admin.site.register(LoansRecord)


