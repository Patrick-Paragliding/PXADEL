# SPEC.md — Revue SUP AIP & Génération OpenAir (Middle Office)

## 1. Vision & Objectif
Maintenir à jour un espace aérien au format OpenAir à partir des revues périodiques de SUP AIP (documents PDF publiés à fréquence régulière sur le site officiel), en filtrant les SUP utiles, en gérant les expirations et en produisant des fichiers OpenAir individuels validés puis un fichier OpenAir collectif fiable, dans un cadre à budget 0 €.

## 2. Utilisateurs & Travail collaboratif (2 à 3 personnes)
- **Contributeurs (2 à 3 personnes)** : se répartissent l'ensemble du flux (détection des nouveautés, lecture/tri utile ou non utile, génération et ajustement du fichier OpenAir individuel face au PDF, contrôle des normes et des commentaires, validation, et repérage des expirations).
- **Prévention du travail en double** :
  - État partagé centralisé (`supaip_state.json`) suivi dans le dépôt Git.
  - Prise en charge explicite via le statut `EN_REVUE` + champ `responsable` avant de traiter un SUP.
  - Traitement par petits lots courts, avec synchronisation régulière (`git pull` en début de session, `commit` + `push` dès qu'un lot est terminé).
  - Un fichier OpenAir individuel par SUP utile afin de limiter les conflits d'édition.

## 3. Cycle de vie et statuts (en français)
- **`NOUVEAU`** : SUP AIP détecté dans la revue périodique, pas encore pris en charge.
- **`EN_REVUE`** : pris en main par un contributeur (`responsable` renseigné) pour analyse, tri ou création/correction du fichier OpenAir.
- **`IGNORE`** : jugé non utile ; aucun fichier OpenAir individuel n'est créé et le SUP n'apparaît plus dans les revues actives suivantes.
- **`VALIDE`** : jugé utile ; fichier OpenAir individuel généré, corrigé si nécessaire par rapport au PDF, conforme aux normes OpenAir et aux commentaires standardisés, puis validé.
- **`EXPIRE`** : période de validité échue (ou SUP annulé/obsolète) constatée lors d'une revue ; retiré de la liste des valides et exclu de la génération du fichier OpenAir collectif.

## 4. Règles métier clés
- **Détection & tri** : lors de chaque revue du document résumé PDF, repérer les nouveaux SUP. Si un SUP est non utile, le passer en `IGNORE` sans créer de fichier OpenAir individuel et sans le faire réapparaître dans les revues actives suivantes.
- **Création & correction assistée** : pour un SUP utile, proposer une organisation OpenAir par défaut et permettre à l'utilisateur de la corriger en comparant avec le contenu du PDF (notamment pour compenser les anomalies ponctuelles de structure PDF).
- **Conformité & commentaires standardisés** : vérifier que le fichier OpenAir généré respecte la syntaxe/normes OpenAir et applique un standard de commentaires défini (en-tête/métadonnées normalisées et remarques de revue/correction) tant dans les fichiers individuels que dans le fichier collectif.
- **Expirations** : lors d'une revue, tout SUP `VALIDE` dont la validité est expirée passe en `EXPIRE` et n'apparaît plus dans les SUP valides ni dans l'export collectif.
- **Fichier OpenAir collectif** : généré ponctuellement à la demande de l'utilisateur en regroupant l'ensemble des SUP actifs (`statut == "VALIDE"` et non expirés), avec commentaires normés individuels et collectifs.

## 5. Architecture & Cibles (3 Tiers, Budget 0 €)
- **Architecture modulaire 3 Tiers** : séparation nette entre configuration (`config/`), logique métier/traitement (`core/`), interface utilisateur (`ui/`), jeux d'essai (`samples/`) et sorties/paquets (`build/`).
- **Double canal de diffusion** : pré-test et travail en ligne sur l'hébergement existant + pack hors-ligne autonome (fichier `.html` unique) utilisable sans réseau sur Windows 11 et Android.
- **Formats** : données d'état et métadonnées légères (`JSON` / `CSV`) et fichiers OpenAir (`.txt`).

## 6. Hors périmètre (V1)
- Base de données externe payante ou serveur applicatif complexe.
- Automatisation complète sans contrôle humain sur les anomalies de structure PDF.

# Persona utilisateur & principes UX

### Persona type : le contributeur / pilote bénévole
- **Profil** : pilote ou contributeur technique passionné de vol libre / cross-country, attentif à la fiabilité des données d'espace aérien et à la simplicité d'usage.
- **Contexte d'usage** : travaille sur des sessions ponctuelles (parfois longues lorsqu'il faut déchiffrer un SUP AIP dense, ses tableaux de coordonnées, ses horaires ou ses cartes), sur poste Windows 11 ou appareil mobile/tablette Android, en ligne ou via un fichier `.html` autonome à budget 0 €.

## Architecture fonctionnelle & Parcours en 3 écrans

L'application s'organise autour d'un **menu principal à 3 étapes**, correspondant aux trois rythmes distincts de la méthode de travail :

1. **Écran 1 — Screening Mensuel (Listing SUP AIP)** : balayage rapide des évolutions par rapport au mois précédent, détection des expirations/disparitions et accès aux fichiers sources.
2. **Écran 2 — Revue SUP AIP & OpenAir (Écran principal)** : parcours en deux temps (*Liste de sélection → Fiche dédiée à l'enregistrement unique* avec bouton retour) permettant de lire le PDF en grand, contrôler la compliance technique, éditer l'OpenAir individuel et trancher le statut (`NOUVEAU`, `EN_REVUE`, `IGNORE`, `VALIDE`, `EXPIRE`).
3. **Écran 3 — Compilation & Export Collectif** : vérification des SUP actifs (`VALIDE` et non expirés) et génération du fichier OpenAir collectif final.


### Spécification de l'Écran 1 : Screening Mensuel (Listing)

- **Source de données** : fichier listing officiel du type `SUPAIP-LISTING-YYYY-MM-DD.pdf`, comparé au listing de la période précédente et croisé avec l'état suivi (`supaip_state.json`).
- **Colonnes exploitées** : `Année-Index`, `Objet`, `Validité Du`, `Validité Au`, `AIRAC`, `VFR`, `IFR`.
  - *Contrainte technique PDF* : la première colonne du listing PDF (icône/image) n'est pas décodée automatiquement et est volontairement ignorée lors de l'extraction.
- **Tri par défaut** : ordre **décroissant** sur le numéro de SUP AIP (`Année-Index`, ex. `2026-248` avant `2026-204`) afin d'afficher les publications les plus récentes en tête.
- **Contrôles de screening & détection d'écarts** :
  - **Nouveaux / Modifiés** : mise en évidence des SUP apparus depuis le listing précédent ou dont les dates/attributs (`Validité Du/Au`, `AIRAC`, `VFR`, `IFR`) ont évolué.
  - **Disparus ou Expirés** : alerte visuelle sur tout SUP actuellement au statut `VALIDE` (ou actif) dans le suivi local qui **n'apparaît plus** dans le listing courant ou dont la date `Validité Au` est dépassée, afin de faciliter son basculement en `EXPIRE`.
- **Actions rapides depuis la ligne** :
  - Télécharger / ouvrir le fichier source du SUP AIP (PDF individuel ou source associée).
  - Qualifier rapidement (`IGNORE`, `EXPIRE`) ou basculer vers l'**Écran 2** pour une revue détaillée.

- **Besoins clés** :    
  - Lire et comprendre le PDF officiel sans être gêné par un cadre minuscule ou un écran saturé.
  - Éviter les doublons de travail grâce à des statuts clairs (`NOUVEAU`, `EN_REVUE`, `IGNORE`, `VALIDE`, `EXPIRE`) et à l'identification du `responsable`.
  - Disposer d'un parcours reposant et lisible, sans scroll excessif ni complexité superflue.

### Principes UX structurants
1. **La lecture du PDF est l'activité première** : l'accès au document source et sa lisibilité priment sur la saisie ou l'édition OpenAir.
2. **Focalisation sur la tâche en cours** : privilégier des parcours épurés (par exemple séparer la sélection dans une liste et la revue d'un enregistrement unique avec retour arrière) plutôt qu'un écran unique surchargé.
3. **Sobriété et économie de scroll** : n'afficher que les champs et actions utiles à l'étape courante, en respectant l'espace disponible sur l'écran.
4. **Cohérence avec le socle UI** : conserver les repères communs (en-tête, logo, bouton d'aide contextuel, zone d'alerte unique, version) d'un outil à l'autre.        

## Contrôles de compliance OpenAir (À qualifier)

> **Statut de cette section** : pistes d'analyse et idées de vérifications techniques à tester sur les échantillons (`samples/`) et les cas réels. Tant qu'une règle n'est pas marquée **Validée**, elle reste informative (non bloquante) dans l'interface.

| ID | Piste / Règle envisagée | Ce qu'on vérifie concrètement | Niveau visé | État |
| :--- | :--- | :--- | :--- | :--- |
| `COMP-01` | Balises OpenAir minimales | Présence des directives de base (`AC`, `AN`, `AL`, `AH`) dans chaque bloc | Alerte / Bloquant à terme | À qualifier |
| `COMP-02` | Fermeture du polygone (`DP`) | Le dernier point `DP` d'un contour polygonal est identique au premier `DP` (minimum 4 lignes `DP`) | Alerte (vigilance) | À qualifier |
| `COMP-03` | Cohérence des arcs / cercles | Si présence de `V X=...` ou `DB` / `DC`, vérifier que la syntaxe des coordonnées et du rayon est complète | Alerte (vigilance) | Idée |
| `COMP-04` | Limites verticales (`AL` / `AH`) | Présence d'un plancher (`AL`) et d'un plafond (`AH`) lisibles et cohérents (ex. `SFC`, `FLxxx`, `xxxxft AMSL`) | Alerte (vigilance) | Idée |
| `COMP-05` | En-tête de traçabilité normé | Présence en commentaire (`*`) de la référence SUP AIP, de la date de fin de validité et du responsable | Info / Alerte | Idée |
| `COMP-06` | Format des coordonnées GPS | Respect du format OpenAir standard (`DD:MM:SS N/S DDD:MM:SS E/W`) sans caractères parasites issus d'un copier-coller PDF | Alerte (vigilance) | Idée |

### Comment faire évoluer ce tableau
1. **Observer** : noter dans `PROMPTS_LOG.md` toute erreur réelle repérée lors de la relecture d'un PDF (ex. inversion Est/Ouest, polygone ouvert, altitude oubliée).
2. **Tester** : ajouter ou ajuster la règle dans le module de contrôle (`core/`) en mode informatif (flag visuel sur l'écran détaillé).
3. **Promouvoir** : basculer l'état de `À qualifier` vers `Validée` une fois la règle éprouvée sans faux positifs sur vos échantillons.             

