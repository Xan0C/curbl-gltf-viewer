import {ECS, Entity, System} from "curbl-ecs";
import {AnimationComponent} from "../../components/scene/animationComponent";
import {Animation} from "../../scene/animation";
import {Cache,CACHE_TYPE} from "../../cache";


@ECS.System(AnimationComponent)
export class AnimationSystem extends System {

    private cache:Cache;

    constructor(cache: Cache) {
        super();
        this.cache = cache;
    }

    setUp(): void {
    }

    tearDown(): void {
    }

    update(t:number) {
        for(let i=0, entity: Entity; entity = this.entities[i]; i++) {
            const animationComponent = entity.get(AnimationComponent);

            if(animationComponent.autoStart && animationComponent.loop && !animationComponent.running) {
                animationComponent.start();
            }

            const animation = this.cache.get<Animation>(CACHE_TYPE.ANIMATION, animationComponent.key);

            const pauseDuration = (animationComponent.pauseEnd - animationComponent.pauseStart);
            const time = t - animationComponent.startTime - pauseDuration;

            if(!animationComponent.paused && animationComponent.running) {
                animation.animate(time);
            }

            if(time >= animation.durationMS) {
                animationComponent.stop();
            }
        }
    }
}