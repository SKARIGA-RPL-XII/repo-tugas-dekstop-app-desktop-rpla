import { cn } from "../../utils/cn"
import { BreadCumb } from "./breadcumb"

type Props = {
  children: React.ReactNode
  className?: string
}

export const ContainerHeaderPage = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "max-w-7xl w-full py-5 flex items-start justify-between gap-4",
        className
      )}
    >
      {children}
    </div>
  )
}

export const HeaderTitle = ({ children }: Props) => {
  return (
    <div className="flex flex-col gap-2 items-start">
      <h1 className="text-3xl font-semibold tracking-tight">
        {children}
      </h1>

      <div className="text-sm">
        <BreadCumb />
      </div>
    </div>
  )
}

export const HeaderActions = ({ children }: Props) => {
  return (
    <div className="flex items-center gap-2">
      {children}
    </div>
  )
}
