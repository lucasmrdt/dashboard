
# 🧩 Scripts
> **⚠️ Veillez à mettre vos fichiers de configuration dans le dossier [assets](../assets).**

<br/>


## 👀 `Scripts` Disponibles :

- [Importer une liste de red-bull-codes](#red-bull-codes)
- [Importer les jeux](#games)

<br/>

## 🚀 Launch

```bash
npm run scripts

# Then select this :
# ❯  {{YOUR_ENVIRONMENT}}
# ❯  import red-bull codes
```

<br/>

## <a id="red-bull-codes"></a> 🏷 Import de **Red-bull codes**

> Permet d'importer les codes Red-bull (présent dans un fichier text) dans la base de donnée mongoDB.


### 📝 Format du fichier *(example [red-bull-codes.txt](../assets/red-bull-codes.txt))*
```txt
AAAA1111
AAAA1111
AAAA1111
AAAA1111
```

### 💻 Command
```bash
NODE_ENV={{YOUR_ENVIRONMENT}} npm run build:import-codes
```

<br/>

## <a id="games"></a> 🏷 Import des **Jeux**

> Permet d'importer les jeux (présent dans un fichier de configuration) dans la base de donnée mongoDB.


### 📝 Format du fichier *(example [games-config.json](../assets/games-config.json))*
[see here](./GAME-CONFIGURATION.md)

### 💻 Command
```bash
NODE_ENV={{YOUR_ENVIRONMENT}} npm run build:import-games
```
