release:
	yarn build
	rm -rf ~/myGit/premium-osmedeus-base/ui && cp -R build ~/myGit/premium-osmedeus-base/ui
	rm -rf ~/org-osmedeus/osmedeus-base/ui && cp -R build ~/org-osmedeus/osmedeus-base/ui
