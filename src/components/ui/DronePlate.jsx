import droneImg from '../../assets/drone.png'

/**
 * Renders the drone cut-out.
 *
 * The asset is a tightly cropped transparent PNG (1110x515), so the frame
 * ratio matches it exactly and `object-contain` keeps every rotor tip visible
 * on any breakpoint.
 */
export default function DronePlate({
  alt = 'Drone quadcopter AERONUSA',
  ratio = 'aspect-[1110/515]',
  className = '',
  imgClassName = '',
  float = false,
  zoom = 1,
}) {
  return (
    <div className={`relative ${ratio} ${className}`}>
      <div className="absolute inset-0" style={{ transform: `scale(${zoom})` }}>
        <img
          src={droneImg}
          alt={alt}
          draggable="false"
          className={`drone-plate h-full w-full select-none object-contain ${
            float ? 'animate-float-slow' : ''
          } ${imgClassName}`}
        />
      </div>
    </div>
  )
}
