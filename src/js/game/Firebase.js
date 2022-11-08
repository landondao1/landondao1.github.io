import { getDatabase, ref, update, onDisconnect, onChildAdded, onValue, query } from "firebase/database";
import { getAuth, signInAnonymously } from "firebase/auth";
import { initializeApp } from "firebase/app";

import Sprite from "./Sprite"

class Firebase {
    constructor(canvas, initialData, offsetX, offsetY, sprites) {
        this.sprites = sprites;
        this.canvas = canvas;
        this.visitors = {};
        this.ref = null;
        this.uid = "";

        // Initialize firebase app
        const config = {
            apiKey: "AIzaSyBx8N4pXyUs-K2yMJpt2AyGqf82ugEpFnw",
            authDomain: "chatisland-45a1e.firebaseapp.com",
            projectId: "chatisland-45a1e",
            storageBucket: "chatisland-45a1e.appspot.com",
            messagingSenderId: "883694167338",
            appId: "1:883694167338:web:e5796c1b84e2c126b3ea53",
            measurementId: "G-MNQNHF6T48"
        };
        initializeApp(config);

        // Sign user into the firebase app
        this.auth = getAuth();
        this.auth.onAuthStateChanged((user) => {
            if (user) {
                this.uid = user.uid;
                this.ref = ref(getDatabase(), `visitors/${this.uid}`);
                onDisconnect(this.ref).remove();

                initialData.id = this.uid;
                this.setVisitorReference(initialData);
            }
        });
        signInAnonymously(this.auth);

        const visitorQuery = query(ref(getDatabase(), `visitors`));
        onChildAdded(visitorQuery, (snapshot) => {
            const visitor = snapshot.val();
            if (!visitor) return

            if (visitor.id && visitor.id !== this.uid) {
                let sprite = this.sprites.down;
                if (visitor.direction) {
                    sprite = this.sprites[visitor.direction];
                }
                this.visitors[visitor.id] = new Sprite(this.canvas, sprite, visitor.x, visitor.y, visitor.frames, this.sprites);
            }
        });
        onValue(visitorQuery, (snapshot) => {
            const value = snapshot.val();
            if (!value) return

            Object.keys(value).forEach((id) => {
                if (id && id !== this.uid) {
                    if (this.visitors[id] == null) {
                        let sprite = this.sprites.down;
                        if (value[id].direction) {
                            sprite = this.sprites[value[id].direction];
                        }
                        this.visitors[id] = new Sprite(this.canvas, sprite, value[id].x, value[id].y, value[id].frames, this.sprites);
                    } else {
                        if (value[id].direction) this.visitors[id].image = this.sprites[value[id].direction];
                        this.visitors[id].x = value[id].x + offsetX;
                        this.visitors[id].y = value[id].y + offsetY;
                        this.visitors[id].frames = value[id].frames;
                    }
                }
            });
        });
    }

    draw(offset) {
        Object.keys(this.visitors).forEach((id) => {
            this.visitors[id].draw(false, offset);
        });
    }

    setVisitorReference(data) {
        data.id = this.uid
        update(this.ref, data);
    }
}

export default Firebase;