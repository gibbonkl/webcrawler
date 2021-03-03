from bs4 import BeautifulSoup
import requests
import re

inicialPage = "https://ifrs.edu.br/riogrande"
maxPageLevel = '7'
limitCrawledPages = 2

selectedUrls = []
index = -1


def getUrls(urlIn):
    global index
    page = requests.get(urlIn).text
    soup = BeautifulSoup(page, "html5lib")

    reg = "https://ifrs.edu.br/riogrande(/[^#/]+){0," + maxPageLevel + "}/?$"

    urls = [a['href']
            for a in soup('a')
            if(a.has_attr('href') and re.match(reg, a['href']))]

    for url in urls:
        if(url not in selectedUrls):
            selectedUrls.append(url)

    index += 1


getUrls(inicialPage)

while (len(selectedUrls) > index and index < limitCrawledPages):
    getUrls(selectedUrls[index])

print(len(selectedUrls))
