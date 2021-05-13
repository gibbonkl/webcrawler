from bs4 import BeautifulSoup
import requests
import re

initialPage = "https://www.pichau.com.br/hardware/placa-m-e/placa-mae-asus-tuf-h310m-plus-gaming-br-ddr4-socket-lga1151-chipset-intel-h310"
limitCrawledPages = 2
reg = "https://www.pichau.com.br/?(/[^#/]+){3}/?$"

selectedUrls = []
index = -1


def getUrls(urlIn):
    global index

    page = requests.get(urlIn).text
    soup = BeautifulSoup(page, "html5lib")

    urls = [a['href'] for a in soup('a') if(
        a.has_attr('href') and re.match(reg, a['href']))]

    for url in urls:
        if(url not in selectedUrls):
            selectedUrls.append(url)

    print(soup.find("a", attrs={"class": "item category"})["title"])
    try:
        print(soup.find('a', attrs={'class': 'item category'})['title'])
        print(soup.find('a', attrs={'class': 'product title'})['h1'])
        # print(soup.find('a', attrs={'class': 'price'}))
        # print(soup.findAll('a', attrs={'class': 'data item content'})['p'])
    except:
        pass

    index += 1


getUrls(initialPage)

while (len(selectedUrls) > index and index < limitCrawledPages):
    getUrls(selectedUrls[index])


print(len(selectedUrls))
print(index)
