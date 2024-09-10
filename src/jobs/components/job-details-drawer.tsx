import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from '@/components/ui/drawer'

import { JobsPosition } from '../types'

import JobView from './job-view'

export default function JobDetailsDrawer({
  selectedPosition,
  isOpen,
  isLiked,
  onLikeClick,
  onClose,
}: {
  isOpen: boolean
  selectedPosition: JobsPosition
  isLiked: boolean
  onLikeClick: () => void
  onClose: () => void
}) {
  return (
    <Drawer open={isOpen}>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent className="h-[100vh]">
        <div className="overflow-y-hidden">
          <JobView
            {...selectedPosition}
            title={selectedPosition.title}
            companyName={selectedPosition.company.name}
            companyAvatarUrl={selectedPosition.company.logo}
            positionTerm={selectedPosition.type}
            positionLevel={selectedPosition.level}
            locationType={selectedPosition.locationType}
            date="2024-08-12T16:15:53+02:00"
            onApplyClick={() => {}}
            isLiked={isLiked}
            onLikeClick={onLikeClick}
          />
        </div>
        <DrawerFooter>
          <Button variant="default" onClick={onClose}>
            Close
          </Button>
        </DrawerFooter>
        {/* <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        */}
      </DrawerContent>
    </Drawer>
  )
}
