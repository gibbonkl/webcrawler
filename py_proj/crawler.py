from bs4 import BeautifulSoup
import requests
import re

page = requests.get("https://ifrs.edu.br/riogrande").text
soup = BeautifulSoup(page, "html5lib")

selectedUrls = []

urls = [a['href']
        for a in soup('a')
        if(a.has_attr('href'))]

reg = "https://ifrs.edu.br/riogrande(/[^#/]+){0,1}/?$"

crawledUrls = [url for url in urls if (
    re.match(reg, url) and url not in selectedUrls)]

selectedUrls = [url for url in crawledUrls if (
    url not in selectedUrls)]

print(selectedUrls)
