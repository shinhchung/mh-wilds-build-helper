# MH Wilds Build Helper

A lightweight Expo + React Native + TypeScript mobile app scaffold for recommending Monster Hunter Wilds-style builds.

## Current features

- Choose one of three playstyles: attack, defense, balanced
- View a recommended weapon and armor loadout
- View recommended decorations / jewels
- Read skill descriptions and level effects
- Uses a local TypeScript data model (currently limited to in-repo Wilds sample sets only)

## Project structure

- `App.tsx` - single-screen mobile UI
- `src/types` - domain types for builds, armor, skills, decorations
- `src/data` - local sample data for skills, jewels, and builds
- `src/logic` - build recommendation logic
- `src/components` - reusable UI sections
- `src/theme` - shared color tokens

## Architecture

`App.tsx` is the main orchestrator. It tracks the selected weapon, element, playstyle, and active build variant, then combines static data with recommendation logic to render the final loadout view.

### Runtime flow

```mermaid
flowchart TD
    A["User input"] --> B["App.tsx"]

    B --> C["Weapon selection\nselectedWeapon"]
    B --> D["Element selection\nselectedElement"]
    B --> E["Playstyle selection\nplaystyle"]
    B --> F["Build variant switch\nbuildIdx"]

    C --> G["getWeaponRecommendation()\nsrc/data/weapons.ts"]
    D --> G
    E --> H["recommendBuilds()\nsrc/logic/recommendBuild.ts"]

    G --> I["weaponRec"]
    H --> J["armorBuilds"]
    J --> K["active build\narmorBuild"]

    K --> L["skillTotals\narmor + decorations"]
    K --> M["decoGrouped\ngrouped jewel display"]

    I --> N["Results UI"]
    K --> N
    L --> N
    M --> N

    N --> O["Weapon recommendation"]
    N --> P["Armor configuration"]
    N --> Q["Set bonuses"]
    N --> R["Decoration suggestions"]
    N --> S["Skill overview"]
    N --> T["Defense stats"]
    N --> U["Notes"]
```

### Data model

```mermaid
flowchart LR
    A["src/types/index.ts"] --> B["Skill"]
    A --> C["Decoration"]
    A --> D["ArmorPiece"]
    A --> E["Build"]
    A --> F["DefenseStats"]
    A --> G["WeaponRecommendation"]

    H["src/data/skills.ts"] --> B
    I["src/data/decorations.ts"] --> C
    J["src/data/armor.ts"] --> D
    K["src/data/builds.ts"] --> E
    L["src/data/weapons.ts"] --> G

    E --> D
    E --> C
    E --> F
    E --> G

    M["src/logic/recommendBuild.ts"] --> E
    N["src/logic/armorSearch.ts"] --> D
    N --> C
```

## Run locally

```bash
npm install
npm run start
```

Then open with Expo Go or an emulator.

## Next recommended upgrades

1. Replace sample data with verified Monster Hunter Wilds data files
2. Add filtering by weapon type
3. Add search and favorite builds
4. Add multilingual skill text and richer stat calculations


## Data validation status

- Build presets now only reference equipment defined in `src/data/armor.ts` to avoid cross-title set names.
- This project is still an offline helper; verify final in-game values against your current game version/patch notes.
