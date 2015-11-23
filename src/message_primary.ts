module RongIMLib {
    export class TextMessage implements MessageContent, UserInfoAttachedMessage, ExtraAttachedMessage {
        userInfo: UserInfo;
        message: TextMessage;
        content: string;
        extra: string;
        constructor(message: any) {
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> TextMessage.");
            }
            this.message = message;
        }
        static obtain(text: string): TextMessage {
            var msg = new TextMessage({ extra: "", content: text });
            return msg;
        }
        setExtra(extra: string): void {
            this.message.extra = extra;
        }
        setContent(content: string): void {
            this.message.content = content;
        }
        getExtra(): string {
            return this.message.extra;
        }
        getContent(): string {
            return this.message.content;
        }
        encode() {
            var c = new Modules.UpStreamMessage();
            c.setSessionId(3);
            c.setClassname("RC:TxtMsg");
            c.setContent(JSON.stringify(this.message));
            var val = c.toArrayBuffer();
            if (Object.prototype.toString.call(val) == "[object ArrayBuffer]") {
                return [].slice.call(new Int8Array(val))
            }
            return val;
        }
    }

    export class VoiceMessage extends RongIMMessage implements MessageContent, UserInfoAttachedMessage {
        userInfo: UserInfo;
        static message: VoiceMessage;
        constructor(message: any) {
            super(message);
            if (!VoiceMessage.caller && arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> VoiceMessage.");
            }
            super.setObjectName("RC:VcMsg");
            super.setMessageType(MessageType.VoiceMessage);
        }

        static obtain(base64Content: string, duration: number): VoiceMessage {
            VoiceMessage.message = new VoiceMessage({
                content: base64Content,
                duration: duration,
                extra: ""
            });
            return VoiceMessage.message;
        }
        getMessage(): RongIMMessage {
            return VoiceMessage.message;
        }
        setDuration(a: any) {
            super.setContent(a, "duration");
        }
        getDuration(): any {
            return super.getDetail().duration;
        }
    }

    export class ImageMessage extends RongIMMessage implements MessageContent, UserInfoAttachedMessage {
        userInfo: UserInfo;
        static message: ImageMessage;
        constructor(message: any) {
            super(message);
            if (!ImageMessage.caller && arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> ImageMessage.");
            }
            super.setMessageType(MessageType.ImageMessage);
            super.setObjectName("RC:ImgMsg");
        }
        static obtain(content: string, imageUri: string): ImageMessage {
            ImageMessage.message = new ImageMessage({
                content: content,
                imageUri: imageUri,
                extra: ""
            })
            return ImageMessage.message;
        }
        setImageUri(a: any) {
            super.setContent(a, "imageUri");
        }
        getImageUri(): string {
            return super.getDetail().imageUri
        }
        getMessage(): RongIMMessage {
            return ImageMessage.message;
        }
    }

    export class LocationMessage extends RongIMMessage implements MessageContent, UserInfoAttachedMessage {
        userInfo: UserInfo;
        extra: string;
        latitude: number;
        longitude: number;
        poi: string;
        imgUri: string;
        static message: LocationMessage;
        constructor(message: any) {
            super(message);
            if (!LocationMessage.caller && arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> LocationMessage.");
            }
            super.setMessageType(MessageType.LocationMessage);
            super.setObjectName("RC:LBSMsg");
        }

        static obtain(latitude: number, longitude: number, poi: string, imgUri: string): LocationMessage {
            LocationMessage.message = new LocationMessage({
                latitude: longitude,
                longitude: longitude,
                poi: poi,
                imgUri: imgUri,
                extra: ""
            });
            return LocationMessage.message;
        }
        getMessage(): RongIMMessage {
            return LocationMessage.message;
        }
        setLatitude(a: any) {
            super.setContent(a, "latitude")
        }
        getLatitude(): number {
            return this.getDetail().latitude;
        }
        setLongitude(a: any) {
            super.setContent(a, "longitude")
        }
        getLongitude(): number {
            return this.getDetail().longitude;
        }
        setPoi(a: any) {
            super.setContent(a, "poi")
        }
        getPoi(): string {
            return this.getDetail().poi;
        }

    }
    export class RichContentMessage extends RongIMMessage implements MessageContent, UserInfoAttachedMessage {
        userInfo: UserInfo;
        static message: RichContentMessage;
        constructor(message: any) {
            super(message);
            if (!LocationMessage.caller && arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> RichContentMessage.");
            }
            super.setMessageType(MessageType.RichContentMessage);
            super.setObjectName("RC:ImgTextMsg");
        }
        static obtain(title: string, content: string, imageUri: string): RichContentMessage {
            RichContentMessage.message = new RichContentMessage({
                title: title,
                content: content,
                imageUri: imageUri
            });
            return RichContentMessage.message;
        }
        getMessage(): RongIMMessage {
            return RichContentMessage.message;
        }
        setTitle(a: any) {
            super.setContent(a, "title")
        };
        getTitle(): string {
            return this.getDetail().title;
        };
        setImageUri(a: any) {
            super.setContent(a, "imageUri")
        };
        getImageUri(): string {
            return this.getDetail().imageUri;
        };
    }
    export class UnknownMessage extends RongIMMessage implements MessageContent {
        constructor(data: string, objectName: string) {
            super(this);
            super.setMessageType(MessageType.UnknownMessage);
            super.setObjectName(objectName);
        }
        getMessage(): RongIMMessage {
            return this;
        }
    }
}
