![hodie-pod](https://github.com/elmonashodie/hodie/blob/master/pics/hodie-pod.png)

# hodie-pod

## Funktionella krav
* Ett eget domännamn
* Giltigt certifikat (https)
* Ta emot anslutning från klienten med websocket.
* Ett REST-api för registrering/inlogg
* JWT för verifiering av WSS
* MongoDB databas för att spara användaruppgifter och meddelanden.
* Docker (gärna pipelines med installationsscript)
* Express (flest studenter kan använda det)

# Client
* Kan skrivas i vilket språk man vill och kommuncierar med hodie-pod
* Gärna React!
* PWA vore kul
* Tänk återanvändbara komponenter och exam3 i 1dv022

Idag är vi beroende av en tredje part för att kunna ta kontakt med varandra, vanligtvis ett företag. Jag ser en del problem med detta, dels att vi får godkänna kilometerlånga avtal där vi inte förstår ett ord vad det står och att vi inte längre orka bry oss. I slutändan så vet vi ändå att dom gör vad dom vill med våran data. Det finns såklart fler anledningar till att jag inte gillar systemet att vara beroende av ett företag men… Tänk om..

Tänk om istället för att vi ska vara beroende av en tredjepart så gör vi någonting annat. Vi utgår ifrån oss själva. Se det som en cell en kärna, du. Det är ju ett perfekt ställe att spara information som vi tar emot ifrån omvärlden på. Exempelvis våran stegdata eller hur vi rör oss. Så istället för att ett företag ska försöka samla in så mycket data som möjligt i smyg så gör vi ett aktivt val att spara våran egna data.

Tänk vi kan till och med göra en anslutning till en kompis. En anslutning där vi byter krypteringsnycklar och skapar en kontakt. Då kommer ni alltid ha en kontakt och sålänge man har kvar samma nycklar kan ni alltid nå varandra. Eran konversation sparas hos dig och han har en lokal kopia hos sig, eller nåja vad han gör kan du inte påverka eftersom han likt dig väljer själv.

Då är du helt plötsligt inte längre beroende av den tredje parten.

## Uppdatering ett år senare
Att bara hålla datan hos sig självt är uteslutet, för att det ska fungera måste du ha en server, din egna plats på Internet. Ett stort problem är att vi idag betalar hos företagen med våran integritet och data. Vi ändrar förhållandet genom att ett företag hyr ut en server till dig. Företaget kan inte läsa din data och ska göra sitt yttersta för att inte göra det (annars byter du leverantör). Du betalar en måndadskostnad för att hyra servern och sedan gör du som du vill.

### Steg 1
Vi skapar ett proof of concept, en wrapper runt Messengers API och ser om vi kan göra våran egna chatttjänst.
