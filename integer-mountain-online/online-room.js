/* Additive room policy: filtering/admission only; original game rules stay unchanged. */
(function(root){
    'use strict';
    const CATEGORIES=Object.freeze({addition:'➕ การบวก',subtraction:'➖ การลบ',multiplication:'✖️ การคูณ',division:'➗ การหาร',order_of_operations:'🔢 ลำดับการดำเนินการ',word_problem:'📝 โจทย์ปัญหา'});
    const LEVELS=['easy','medium','hard'],SPECTATOR_LIMIT=20;
    const BOARD_LABELS=Object.freeze({20:'20 ช่อง — เกมสั้น',30:'30 ช่อง — เกมปานกลาง',40:'40 ช่อง — เกมยาว',50:'50 ช่อง — เกมเต็มรูปแบบ'});
    const isValidBoardSize=value=>typeof value==='number' && [20,30,40,50].includes(value);
    const boardSize=settings=>settings?.boardSize===undefined?50:settings.boardSize;
    function normalizeSettings(settings){
        const categories=Array.isArray(settings?.questionCategories)?settings.questionCategories:Object.values(settings?.questionCategories || {});
        if(!categories.length)throw Error('กรุณาเลือกประเภทโจทย์อย่างน้อย 1 ประเภท');
        if(categories.some(c=>!Object.hasOwn(CATEGORIES,c)) || new Set(categories).size!==categories.length)throw Error('ประเภทโจทย์ไม่ถูกต้อง');
        if(!LEVELS.includes(settings.difficultyLevel))throw Error('ระดับความยากไม่ถูกต้อง');
        if(settings.boardSize!==undefined && !isValidBoardSize(settings.boardSize))throw Error('ขนาดแผนที่ไม่ถูกต้อง');
        return {questionCategories:Object.keys(CATEGORIES).filter(c=>categories.includes(c)),difficultyLevel:settings.difficultyLevel,...(settings.boardSize===undefined?{}:{boardSize:settings.boardSize})};
    }
    const defaultSettings=()=>({questionCategories:Object.keys(CATEGORIES),difficultyLevel:'medium',boardSize:30});
    function filterCatalog(catalog,settings){
        const policy=normalizeSettings(settings),max=LEVELS.indexOf(policy.difficultyLevel),pools={};
        for(const type of ['mission','puzzle']){
            pools[type]={};
            for(const level of LEVELS)pools[type][level]=Object.values(catalog.pools[type][level] || {}).filter(id=>{
                const q=catalog.byId[id];return policy.questionCategories.includes(q.category) && LEVELS.indexOf(q.difficulty)<=max;
            });
        }
        return {byId:catalog.byId,pools};
    }
    // Prefer the original requested pool. Only filtered rooms get fallback, never legacy games.
    function availableQuestions(catalog,settings,used,type,requested){
        const filtered=filterCatalog(catalog,settings),available=ids=>ids.filter(id=>!used?.[id]);
        const wanted=requested.flatMap(level=>filtered.pools[type][level] || []),original=available(wanted);
        if(original.length)return original;
        const closest=LEVELS.slice().sort((a,b)=>Math.min(...requested.map(l=>Math.abs(LEVELS.indexOf(a)-LEVELS.indexOf(l))))-Math.min(...requested.map(l=>Math.abs(LEVELS.indexOf(b)-LEVELS.indexOf(l)))) || LEVELS.indexOf(b)-LEVELS.indexOf(a));
        for(const candidateType of [type,type==='mission'?'puzzle':'mission'])for(const level of closest){
            const ids=available(filtered.pools[candidateType][level]);if(ids.length)return ids;
        }
        // A long room can exhaust its bank. Reuse the nearest allowed pool rather than stall.
        for(const candidateType of [type,type==='mission'?'puzzle':'mission'])for(const level of closest){
            const ids=filtered.pools[candidateType][level];if(ids.length)return ids;
        }
        return [];
    }
    function joinSpectators(slots,profile,status,kicked={}){
        if(kicked[profile.uid])throw Error('คุณถูกนำออกจากห้องนี้');
        const next=JSON.parse(JSON.stringify(slots || {}));
        if(Object.values(next).some(p=>p.uid===profile.uid))return next;
        if(!['waiting','playing','finished'].includes(status))throw Error('ห้องนี้ไม่เปิดให้ชมแล้ว');
        const key=Array.from({length:SPECTATOR_LIMIT},(_,i)=>`t${i}`).find(k=>!next[k]);
        if(!key)throw Error('ห้องนี้มีผู้ชมครบ 20 คนแล้ว');
        next[key]=profile;return next;
    }
    const api={CATEGORIES,LEVELS,SPECTATOR_LIMIT,BOARD_LABELS,isValidBoardSize,boardSize,defaultSettings,normalizeSettings,filterCatalog,availableQuestions,joinSpectators};
    root.OnlineRoom=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
