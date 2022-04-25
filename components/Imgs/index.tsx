import Image from 'next/image'

function Imgs({ src, mod }: { src: string; mod: string }) {
  return (
    <div className={`imageContainer imageContainer_${mod}`}>
      <Image
        src={src}
        alt=""
        width={100}
        height={100}
        layout="responsive"
        priority
      />
    </div>
  )
}

export default Imgs
