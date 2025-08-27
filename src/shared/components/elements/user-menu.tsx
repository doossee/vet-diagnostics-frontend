import { UserCog } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { ModeToggle } from "@/shared/components/theme-toggler"
import { LogoutButton } from "@/shared/components/logout-button"
import { ToggleLocale } from "@/shared/components/toggle-locale"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover"

export function UserMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
          <Button size={"icon"} variant={"outline"}>
          <UserCog />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-2! max-w-[170px] mr-4!">
        <div className="flex flex-col gap-2">
          <ToggleLocale />
          <hr />
          <LogoutButton />
          <hr />
          <ModeToggle />
        </div>
      </PopoverContent>
    </Popover>
  )
}